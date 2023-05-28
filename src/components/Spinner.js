import spinner from '../assets/img/spinner.gif'

function Spinner() {
  return (
    <div className='w-100 mg-t-huge centered'>
      <img
        width={100}
        className='centered mx-auto'
        src={spinner}
        alt='Loading...'
      />
    </div>
  )
}

export default Spinner