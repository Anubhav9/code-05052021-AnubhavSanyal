const express=require('express');
const fs=require('fs');
const app=express();
const port=5151;
app.get('/',(req,res)=>{
    let jsonData=fs.readFileSync('../data.json');
    jsonData=JSON.parse(jsonData);
    let jsonLength=Object.keys(jsonData).length;
    for(let i=0;i<jsonLength;i++)
    {
        let personHeight=jsonData[i]['HeightCm'];
        let personWeight=jsonData[i]['WeightKg'];
        personHeight=personHeight/100;
        let squaredPersonHeight=personHeight*personHeight;
        let bmi=personWeight/squaredPersonHeight;
        //Rounding to one decimal place as per the table given
        bmi=Math.round(bmi * 10) / 10
        jsonData[i]['BMI']=bmi;
        let bmiCategoryResult=''
        let healthRisk=''
        if(bmi<18.4)
        {
            bmiCategoryResult='Underweight'
            healthRisk='Malnutrition Risk'
        }
        else if(bmi>=18.5 && bmi<=24.9)
        {
            bmiCategoryResult='Normal Weight'
            healthRisk='Low Risk'
        }
        else if(bmi>=25 && bmi<=29.9)
        {
            bmiCategoryResult='Overweight'
            healthRisk='Enhanced Risk'
        }
        else if(bmi>=30 && bmi<=34.9)
        {
            bmiCategoryResult='Obese'
            healthRisk='Medium Risk'
        }
        else if(bmi>=35 && bmi<=39.9)
        {
            bmiCategoryResult='Severly Obese'
            healthRisk='High Risk'
        }
        else
        {
            bmiCategoryResult='Very Severly Obese'
            healthRisk='Very High Risk'
        }
        jsonData[i]['BMICategory']=bmiCategoryResult;
        jsonData[i]['HealthRisk']=healthRisk;
        


    }
    //Calculating total number of Overweight People.
    //Considering BMI Category above overweight are all overweight
    let countOverWeightPeople=0;
    for(var j=0;j<jsonLength;j++)
    {
        if(jsonData[j]['BMICategory']>='Overweight')
        {
            countOverWeightPeople=countOverWeightPeople+1;
        }
    }
    jsonData['NumberOfOverWeightPeople']=countOverWeightPeople;
    console.log(jsonData);
    //console.log("Number of Overweight people are ",countOverWeightPeople);
    res.send(jsonData);
})



app.listen(port,(req,res)=>{
    console.log('Server Started');
})