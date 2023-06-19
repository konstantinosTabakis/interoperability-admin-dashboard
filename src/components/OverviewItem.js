function OverviewItem({icon , label, total}) {
    return (
        <div className="card__inner-item">
            <div className='icon-area centered'>
                <img src={icon} alt={label+' icon'} />
            </div>
            <div>
                {label}:
                <span> {total} </span>
            </div>
        </div>
    )
}

export default OverviewItem