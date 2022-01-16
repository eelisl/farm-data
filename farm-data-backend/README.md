# Backend functionality

✔️ Validate data
    ✔️ Accept only temperature,rainfall and PH data. Other metrics should be discarded
    ✔️ Discard invalid values with next rules
        ✔️ pH is a decimal value between 0 - 14
       ✔️ Temperature is a celsius value between -50 and 100
        ✔️ Rainfall is a positive number between 0 and 500
        ✔️ Data may be missing from certain dates
✔️ Sort data
    ✔️ by given farm
    ✔️ by given dates
✔️ send data back to frontend