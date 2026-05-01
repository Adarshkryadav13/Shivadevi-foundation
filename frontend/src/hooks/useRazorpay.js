import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { donationAPI } from '../lib/api'

export function useRazorpay() {
  const navigate = useNavigate()

  const loadScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const initiatePayment = useCallback(async ({ amount, name, email, phone, cause }) => {
    const loaded = await loadScript()
    if (!loaded) {
      toast.error('Payment SDK failed to load. Check your internet connection.')
      return
    }

    try {
      const toastId = toast.loading('Creating your donation order...')

      // Create order on backend
      const { data } = await donationAPI.createOrder({
        amount,        // in INR
        name,
        email,
        phone,
        cause,
      })

      toast.dismiss(toastId)

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,       // in paise from backend
        currency: data.currency,
        name: 'BrightEarth Foundation',
        description: `Donation for ${cause || 'General Fund'}`,
        order_id: data.orderId,
        prefill: { name, email, contact: phone },
        notes: { cause },
        theme: { color: '#2D7A4F' },
        handler: async (response) => {
          const verifyToast = toast.loading('Verifying your payment...')
          try {
            await donationAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount,
              name,
              email,
              cause,
            })
            toast.dismiss(verifyToast)
            toast.success('Thank you for your donation! 💚')
            navigate('/donate/success', {
              state: { amount, name, email, paymentId: response.razorpay_payment_id },
            })
          } catch {
            toast.dismiss(verifyToast)
            toast.error('Payment verification failed. Please contact support.')
          }
        },
        modal: {
          ondismiss: () => toast('Donation cancelled. You can try again anytime.', { icon: '💛' }),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      rzp.on('payment.failed', (resp) => {
        toast.error(`Payment failed: ${resp.error.description}`)
      })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to initiate payment. Try again.')
    }
  }, [navigate])

  return { initiatePayment }
}
