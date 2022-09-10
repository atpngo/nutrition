const cheerio = require('cheerio');

export default async function getInfo(req, res)
{
    if (req.method === 'POST')
    {
        try
        {
            const url = req.body.url;
            if (!url.includes("https://menu.dining.ucla.edu/Recipes/"))
            {
                throw "Invalid URL"
            }

            const response = await fetch(url)
            const html = await response.text();

            const $ = cheerio.load(html);

            // GET WEBCODES
            let badges = [];
            $('.prodwebcode').each((index, val) => {
                badges.push($(val).text().trim())
            })

            // GET SERVING SIZE
            let servingSize = $('.nfserv').text().split(" ").splice(2)[0]

            // GET FOOD NAME
            let foodName = $('h2').text();

            // GET INGREDIENTS
            let ingredInfo = $('.ingred_allergen').text().split("\n");
            // TODO: maybe turn this into an array one day but LATER
            let ingredients = ingredInfo[1].trim().replace('INGREDIENTS:', '').trim();
            let allergens = ingredInfo[2].includes("If you have food allergies, it is best to avoid food cooked in our deep fryers due to the risk of cross-contamination.") ?  ingredInfo[2].trim() : ingredInfo[2].trim().split(" ").slice(1).map(item => item.replace(",", ""));

            // GET IMAGE
            // search for recipeImage class to see if it has image or not.
            // if it doesn't return some preset generic image url
            let image = $('.recipeimage').length === 0 ? "https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png" : "https://menu.dining.ucla.edu/" + $('.recipeimage').attr('src');

            // GET NUTRITION INFO
            let nutrition = {};
            nutrition["calories"] = $('.nfcal').text().split(" ")[1]
            $('.nfnutrient').each(
                (index, element) => {
                    let nutritionString = $(element).text()
                    // worse case this doesn't work, change it to check if a string includes stuff
                    let nutritionArray = nutritionString.split(" ");
                    switch (index)
                    {
                        case 0:
                            nutrition["total_fat"] = nutritionArray[2]
                            break
                        case 1:
                            nutrition["saturated_fat"] = nutritionArray[2]
                        case 2:
                            nutrition["trans_fat"] = nutritionArray[2]
                        case 3:
                            nutrition["cholesterol"] = nutritionArray[1]
                        case 4:
                            nutrition["sodium"] = nutritionArray[1]
                        case 5:
                            nutrition["total_carbohydrate"] = nutritionArray[2]
                        case 6:
                            nutrition["dietary_fiber"] = nutritionArray[2]
                        case 7:
                            nutrition["sugars"] = nutritionArray[1]
                        case 8:
                            nutrition["protein"] = nutritionArray[1]
                    } 
                }
            )
            // console.log(nutrition)

            let PAYLOAD = {
                "name": foodName,
                "serving_size": servingSize,
                "nutrition_info": nutrition,
                "ingredients": ingredients,
                "allergens": allergens,
                "badges": badges,
                "image": image
            }

            return res.json({
                status: 200,
                data: PAYLOAD
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
            data: 'Error',
            status: 400
        })
    }
}