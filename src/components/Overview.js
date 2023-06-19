import VerticalBar from "./charts/VerticalBar"
import surveyIcon from '../assets/img/survey.png'
import usersIcon from '../assets/img/users.png'
import evaluationIcon from '../assets/img/evaluation.png'
import questionIcon from '../assets/img/questions.png'
import OverviewItem from "./OverviewItem"


function Overview({ users, surveys, questions, evaluations }) {

  const chartData = {
    labels: ['Users', 'Surveys', 'Evaluations', 'Questions'],
    datasets: [{
      data: [users, surveys, evaluations, questions],
      backgroundColor: ['#e2dddb', '#DBA39A', '#d26060', '#eac9c9'],
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
        <OverviewItem icon={usersIcon} label={'Users'} total={users} />
        <OverviewItem icon={surveyIcon} label={'Surveys'} total={surveys} />
        <OverviewItem icon={evaluationIcon} label={'Evaluations'} total={evaluations} />
        <OverviewItem icon={questionIcon} label={'Questions'} total={questions} />
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