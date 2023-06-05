import VerticalBar from "./charts/VerticalBar"
import surveyIcon from '../assets/img/survey.png'
import usersIcon from '../assets/img/users.png'
import evaluationIcon from '../assets/img/evaluation.png'
import questionIcon from '../assets/img/questions.png'


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
            <img src={usersIcon} alt="users icon" />
          </div>
          <div>
             Users:
            <span> {users} </span>
          </div>
        </div>
        <div className="card__inner-item">
          <div className='icon-area centered'>
            <img src={surveyIcon} alt="survey icon" />
          </div>
          <div>
             Surveys:
            <span> {surveys}  </span>
          </div>
        </div>
        <div className="card__inner-item">
          <div className='icon-area centered'>
            <img src={evaluationIcon} alt="evaluation icon" />
          </div>
          <div>
            Evaluations:
            <span> 0  </span>
          </div>
        </div>
        <div className="card__inner-item">
          <div className='icon-area centered'>
            <img src={questionIcon} alt="question icon" />
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