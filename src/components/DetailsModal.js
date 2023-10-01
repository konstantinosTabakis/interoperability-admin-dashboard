import exitIcon from '../assets/img/exit.png'
import questionImg from '../assets/img/questions.png'

function DetailsModal({ handleSeeDetails, question }) {
    return (
        <div className='modal card'>
            <div className="btn-area">
                <button>
                    <img src={exitIcon} onClick={handleSeeDetails} alt="exit icon" />
                </button>
            </div>
            <div className='centered mg-b-small'>
                <img src={questionImg} />
            </div>
            <div>
                <div className='mg-b-tiny'><span>Question:</span> {question.question}</div>
                <div className='mg-b-tiny'><span>Source:</span> {question.src}</div>
                <div className='mg-b-tiny'><span>Category:</span> {question.type.join(', ')}</div>
                <div className='mg-b-tiny'><span>Requirements:</span>
                    <ul>
                        {question.requirements.map((el, index) => (
                            <li className="mg-b-tiny" key={index}>
                                {el}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DetailsModal;