

export default function DetailCard({ data }) {
  return (
    <div className="hunger-card">

      {/* TITLE */}
      <h1 className="hunger-title">
        {data.title}
      </h1>

      {/* TOP SECTION */}
      <div className="hunger-top">

        {/* LEFT BOX */}
        {/* <div 
          className="hunger-icon-box"
          style={{ backgroundColor: data.color }}
        >
          <p>{data.short}</p>
          <div className="hunger-icon">{data.icon}</div>
          
        </div> */}

        {/* RIGHT LIST */}
        <div className="hunger-image">
          <img src={data.image} alt={data.title} />
        </div>

      </div>

    </div>
  );
}