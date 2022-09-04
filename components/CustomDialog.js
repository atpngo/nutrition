import { Dialog } from "@mui/material";

const activityLevels = {
    "Sedentary" : "Little or no exercise, i.e. desk job",
    "Light" : "Light exercise/sports 1-3 days a week. Burning like 150-200 calories.",
    "Moderate" : "Moderate exercise/sports 6-7 days a week. Burning 300-500 calories.",
    "Very active": "Hard exercise everyday or exercising twice a day.\nBurning around 500-700 calories each day",
    "Extra active": "Hard exercise 2 or more times per day, or training for a marathon, triathalon, etc. Typically burning around 750+ calories a day through exercise"
}


function CustomDialog({open, handleClose})
{

    return (
        <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose}>
            <div className="flex flex-col items-center bg-white p-5 gap-3">
                <p className="text-xl">Activity Levels</p>
                <div className="flex flex-col gap-2">
                    {Object.keys(activityLevels).map(
                        (key) => (
                        <div key={key}>
                            <p className="font-semibold">{key}</p>
                            <p className="pl-4">{activityLevels[key]}</p>
                        </div>
                        )
                    )}
                </div>
            </div>
        </Dialog>
    )
}

export default CustomDialog;