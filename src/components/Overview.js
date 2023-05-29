import VerticalBar from "./charts/VerticalBar"


function Overview({ users, surveys, questions }) {

  const chartData = {
    labels: ['Users', 'Surveys','Evaluations', 'Questions'],
    datasets: [{
      data: [users, surveys,0, questions],
      backgroundColor: ['#e2dddb', '#DBA39A','#d26060' ,'#eac9c9'],
      // barThickness: 120,  // number (pixels) or 'flex'
                maxBarThickness: 120
    },
    ]
  }



  return (
    <div className="overview card mg-b-medium">
      <h4 className="heading-secondary mg-b-medium ">
        Overview
      </h4>
      <div className="card__inner mg-b-big mx-auto">
        <div className="card__inner-item">
          <div className='icon-area centered'>
            {/* <img src="https://cdn-icons-png.flaticon.com/512/5493/5493649.png" alt="" /> */}
            <img src="https://cdn-icons-png.flaticon.com/512/694/694642.png" alt="" />
          </div>
          <div>
             Users:
            <span> {users} </span>
          </div>
        </div>
        <div className="card__inner-item">
          <div className='icon-area centered'>
            <img src="https://cdn-icons-png.flaticon.com/512/839/839860.png" alt="" />
          </div>
          <div>
             Surveys:
            <span> {surveys}  </span>
          </div>
        </div>
        <div className="card__inner-item">
          <div className='icon-area centered'>
            <img src="https://cdn-icons-png.flaticon.com/512/7961/7961078.png" alt="" />
          </div>
          <div>
            Evaluations:
            <span> 0  </span>
          </div>
        </div>
        <div className="card__inner-item">
          <div className='icon-area centered'>
            <img src="https://cdn-icons-png.flaticon.com/512/9425/9425588.png" alt="" />
          </div>
          <div>
             Questions:
            <span> {questions} </span>
          </div>
        </div>
      </div>
      {users > 0 && surveys > 0 && questions > 0 && (
        <div className="chart mx-auto" style={{ minHeight: '350px', maxWidth: '1200px' }}>
          <VerticalBar data={chartData} />
        </div>
      )}
    </div>
  )
}

export default Overview