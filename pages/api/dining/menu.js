const cheerio = require('cheerio');
const validDiningHall = ['DeNeve', 'Rieber'];
const validMealPeriod = ['Breakfast', 'Lunch', 'Dinner']

const removeDuplicates = (arr, key) =>
{
    /**
     * Removes duplicate objects from array
     */
    return arr.filter((v,i,a)=>a.findIndex(v2=>(v2[key]===v[key]))===i);

}

export default async function getMenu(req, res)
{
    if (req.method === 'POST')
    {
        try 
        {  
            let diningHall = req.body.dining_hall;
            let mealPeriod = req.body.meal_period;
            if (!(validDiningHall.includes(diningHall) && validMealPeriod.includes(mealPeriod)))
            {
                console.log(diningHall);
                console.log(mealPeriod);
                throw "Invalid input"
            }
            
            const response = await fetch(`https://menu.dining.ucla.edu/Menus/${diningHall}/${mealPeriod}`)
            const data = await response.text();  
            const $ = cheerio.load(data);
            let PAYLOAD = {};

            $('.sect-item').map((index, element) => {
                const outer = $(element);
                let locationName = outer.html().split('\n')[1].trim().replace('&amp;', '&').replace('*', '');
                PAYLOAD[locationName] = [];
                $(element).find('a').each(
                    (index, innerElement) => {
                        const food = $(innerElement);
                        let name = food.html().replace('&amp;', '&');
                        let url = food.attr('href')
                        let tmpObject = {name: name, url: url};
                        PAYLOAD[locationName].push(tmpObject)
                    }
                )
            })

            // remove duplicates
            Object.keys(PAYLOAD).forEach(
                (key) => {
                    PAYLOAD[key] = removeDuplicates(PAYLOAD[key], "name");

            })

            return res.json({
                status: 200,
                data: PAYLOAD,
            })
        }
        catch
        {
            return res.json({
                data: 'Error',
                status: 400
            })
        }
    }
    else {
        return res.json({
            data: 'Error',
            status: 400
        })
    }
}