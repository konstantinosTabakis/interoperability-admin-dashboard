
function Survey({ survey }) {
    return (
        <div className='card mg-b-small' key={survey.id}>
            <h4 className="heading-secondary mg-b-tiny">
                {survey.name}
            </h4>
            <p> {survey.description}  </p>
        </div>
    )
}

export default Survey