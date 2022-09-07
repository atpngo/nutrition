import LinearProgress from './LinearProgress';

function MacroBar({color, title, text, textColor})
{
    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between'>
                <p className={`colored-text text-${text}`}>{title}</p>
                <p className={`${textColor} text-${text}`}>100/121g</p>
            </div>
          <LinearProgress value={(100/121)*100} color={`${color}`} bg={'bg-light-bg'} p={'1'} borderRadius={'lg'}/>

        </div>
    )
}

export default MacroBar;