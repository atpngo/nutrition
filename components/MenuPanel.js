import { BiCog } from 'react-icons/bi'

function MenuPanel(props)
{
    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <p>Lunch 11am-3pm</p>
                <BiCog/>
            </div>

        </div>
    )
}

export default MenuPanel;