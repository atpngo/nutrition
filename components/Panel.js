function Panel(props)
{
    return(
        <div className="p-5 bg-light-primary dark:bg-dark-primary rounded-xl w-full flex flex-col gap-3 max-w-[500px] shadow-sm">
            <p className="text-xl colored-text">{props.title}</p>
            {props.children}
        </div>
    )
}

export default Panel;