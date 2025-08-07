const fs = require('fs')

const traineeFile = './trainees.json'



function readAllTrainees() {
    fs.readFile(traineeFile, 'utf8', (err, data) => {
        if (err) console.log(err);
        console.log(data);


    })
}

// readAllTrainees();


function readATrainee(email) {
    fs.readFile(traineeFile, 'utf8', (err, data) => {
        if (err) console.log(err);
        // console.log(data);

        let result = JSON.parse(data);
        let mytrainee = result.filter(v => v.email === email);
        if (mytrainee.length > 0) {

            console.log(mytrainee);
        }
        else {
            console.log('No trainee found!!!');

        }

    })
}

// readATrainee("priya1@gmail.com");

function addATrainee(...trainee) {
    const traineeObject = {
        "name": trainee[0],
        "email": trainee[1],
        "batch": trainee[2],
        "year": trainee[3],
        "timings": trainee[4],
    }

    fs.readFile(traineeFile, 'utf8', (err, data) => {
        if (err) console.log(err);
        let result = JSON.parse(data);

        let output = result.filter(v => v.email === traineeObject.email);

        if (output.length > 0) {
            console.log('Trainee already exist!!!');
        }
        else {

            result.push(traineeObject);
            fs.writeFile(traineeFile, JSON.stringify(result), (err, data) => {
                if (err) console.log(err);
                // console.log(data);
                console.log('trainee added successfully!!!');

            })
        }

    })
}

// addATrainee("Raju", "raju@gmail.com", "January", 2023, "7-9pm")


function updateATrainee(...trainee) {
    const traineeObject = {
        "name": trainee[0],
        "email": trainee[1],
        "batch": trainee[2],
        "year": trainee[3],
        "timings": trainee[4],
    }
    fs.readFile(traineeFile, 'utf8', (err, data) => {
        if (err) console.log(err);

        let result = JSON.parse(data);

        let output = result.filter(v => v.email === traineeObject.email);

        if (output.length < 1) {
            console.log('No trainee found!!!');
        }
        else {

            let updatedData = result.map(v => {
                if (v.email === traineeObject.email) {

                    let temp = { ...v };
                    console.log(temp);


                    for (let key in traineeObject) {
                        temp[key] = traineeObject[key]

                    }
                    return temp;
                }

                return v;


            })
            fs.writeFile(traineeFile, JSON.stringify(updatedData), (err, data) => {
                if (err) console.log(err);
                console.log('The trainee updated successfully!!!');


            })


        }

    })
}

// updateATrainee("Kamalrajan", "kamal@gmail.com", "January", 2023, "7-9pm")

function deleteATrainee(email){
    fs.readFile(traineeFile,'utf8',(err,data)=>{
        if(err) console.log(err);

        let result = JSON.parse(data);

        let output = result.filter(v=>v.email === email);

        if(output.length<1){
            console.log('No trainee found!!!');
            
        }
        else{
            let traineeData = result.filter(v=>v.email !== email);
            fs.writeFile(traineeFile,JSON.stringify(traineeData),(err)=>{
                if(err) console.log(err);
                console.log('Trainee was deleted successfully!!!');                
                
            })
        }
        
    })

}

deleteATrainee("kamal@gmail.com");