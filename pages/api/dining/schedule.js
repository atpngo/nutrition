const cheerio = require('cheerio');

const validLocations = ['Rieber', 'DeNeve', 'Epicuria', 'BruinPlate', 'Sproul']

export default async function getSchedule(req, res)
{
    if (req.method === 'GET')
    {
        try {
            const response = await fetch('https://menu.dining.ucla.edu/Hours');
            const html = await response.text();
            const $ = cheerio.load(html);
            let PAYLOAD = {
                'Breakfast': [],
                'Lunch': [],
                'Dinner': []
            };
            $('.hours-table').find($('tr')).each(
                (index, tableRow) => {
                    $(tableRow).find($('.hours-location')).each(
                        (index, locations) => {
                            // location name
                            let location = $(locations).text().split(" ").join("");
                            if (validLocations.includes(location))
                            {
                                // Breakfast
                                $(tableRow).find($('.hours-open.Breakfast')).each(
                                    (index, time) => {
                                        if ($(time).length)
                                        {
                                            PAYLOAD['Breakfast'].push(location);
                                        }
                                    }
                                )

                                // Lunch
                                $(tableRow).find($('.hours-open.Lunch')).each(
                                    (index, time) => {
                                        if ($(time).length)
                                        {
                                            PAYLOAD['Lunch'].push(location);
                                        }
                                    }
                                )

                                // Dinner
                                $(tableRow).find($('.hours-open.Dinner')).each(
                                    (index, time) => {
                                        if ($(time).length)
                                        {
                                            PAYLOAD['Dinner'].push(location);
                                        }
                                    }
                                )
                            }
                        }
                    );
                }
            )

            return res.json({
                data: PAYLOAD,
                status: 200
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
    else
    {
        return res.json({
            data: 'Invalid Request',
            status: 400
        })
    }
}