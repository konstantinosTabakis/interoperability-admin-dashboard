import logo from "../assets/img/logo.png"

function About() {
    return (
        <section className='about'>
            <div className="card">
                <div className="centered">
                    <img src={logo} alt="logo icon" className="logo" />
                </div>
                <h2 className="heading-primary  mg-b-small ">
                    About
                </h2>
                <p className='mg-b-tiny'>  Interoperability Admin   is a web desktop application for admin users. The users can create new surveys regarding the interoperability of public services.
                    The surveys are exposed and can be executed openly on the <a href="https://interoperability-evaluator.netlify.app/" className='bold' target="_blank" rel="noopener noreferrer">Interoperability of Public Services Evaluator </a>
                    as a self assesment test.
                </p>
                <p className='mg-b-tiny'>The platform also provides user friendly ways to monitor the results of the existing surveys and report exports. This project was created in framework of my thesis as a final project of my studies in Hellenic Open University.</p>
                <p className='mg-b-medium'>Feel free to reach out on <a href="https://www.linkedin.com/in/konstantinos-tabakis/">Linkedin</a> or via <a href="mailto:konstantinos.tabakis@gmail.com">Email</a> for any doubts.</p>
            
                <h4 className="heading-secondary mg-b-tiny">How to Use</h4>
                <p className='mg-b-tiny'>The main functionality of the platform is survey creation. Under the tab <em>New Survey </em>  the users with the admin role can create a new survey by providing a name, description and label and also by selecting a set of the available questions.
                After the creation, the new survey is stored in the database and is immediately available for usage and also can been reviewed under the <em>Surveys </em> tab.
                </p>
                <p className='mg-b-tiny'>
                    If the available questions are not enough the admin users can upload more questions for using on survey creation. This functionality can be found under the <em>Questions </em> 
                    tab, where the user can upload a Json file that contains new questions with respect to the specified format.
                </p>
                <p className='mg-b-medium'>
                    Finally under the <em>Evaluations </em> tab, the user can have insights about the results of the self evaluations. 
                     The user is provided with multiple ways of filtering the results, such as by a specific survey, a label or the year that the evaluation was performed.
                      Also the platform supports the exporting of reports about the filtered data in a Json or CSV format.
                </p>
                <div className="bold">
                    Thanks for stopping by!
                </div>
            </div>
        </section>
    )
}

export default About