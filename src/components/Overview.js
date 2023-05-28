
function Overview({users, surveys, questions}) {

   

    return (
        <div className="overview card mg-b-medium">
        <h4 className="heading-secondary mg-b-small">
          Overview
        </h4>
        <div className="card__inner">
          <div className="card__inner-item">
            <div className='icon-area centered'> 
              <img src="https://cdn-icons-png.flaticon.com/512/5493/5493649.png" alt="" />
            </div>
            <div>
              Active Users:
              <span> {users} </span>
            </div>
          </div>
          <div className="card__inner-item">
            <div className='icon-area centered'> 
              <img src="https://cdn-icons-png.flaticon.com/512/839/839860.png" alt="" />
            </div>
            <div>
              Available Surveys:
              <span> {surveys}  </span>
            </div>
          </div>
          <div className="card__inner-item">
            <div className='icon-area centered'> 
              <img src="https://cdn-icons-png.flaticon.com/512/9425/9425588.png" alt="" />
            </div>
            <div>
              Available Questions:
              <span> {questions} </span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Overview