var dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;


const express = require('express');
const app = express();
const port = 3002;
const knex = require('knex')(require('./knexfile.js')[envs.NODE_ENV]);

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world!");
});

// Get a list of tools in the inventory.
// SELECT * FROM tools;
app.get('/enumeratetools', (req, res) => {
    if(req.query.search) {
        let toolToFind = req.query.search;
        let regex = /[\w\s]+$/; // ^[\w\s]+$
        let matches = toolToFind.match(regex);
         console.log("the regex results", matches);
         if (!matches){
             console.log('invalid search');
             res.status(400).json({
                 message: "Invalid tool name supplied",
             })
         } else {
        knex.select('*')
            .from('tools')
            .where('descr', 'ILIKE', `%${toolToFind}%`)
            .orderBy('serv_status','desc')
            .then((data) => {
                if (data.length === 0) {
                    res.status(404).json({
                        message: "The data you are looking for could not be found. Please try again",
                    });
                } else {
                    res.status(200).json(data)
                }
            })
            .catch((err) => {
                res.status(404).json({
                    message: "The data you are looking for could not be found. Please try again",
                });
            });
        }
    }
    else {
        knex.select('*')
            .from('tools')
            .orderBy('serv_status','desc')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(404).json({
                    message: "The data you are looking for could not be found. Please try again",
                });
            });
    }
});

// Get a specific tool, given the tool id.
// SELECT * FROM tools WHERE tool_id="<toolid>";
app.get('/gettool/:toolid', (req, res) => {
    knex.select('*')
        .from('tools')
        .where({tool_id: req.params.toolid})
        .then((data) => {
            if (data.length ===1) {
                res.status(200).json(data[0])
            }
            else if ( data.length === 0) {
                res.status(404).json({
                    message:"Tool Id not found."
                })
            }
        })
        .catch((err) =>
        res.status(404).json({
          message: "The data you are looking for could not be found. Please try again",
        })
      );
    
});

// Get a list of personnel.
// SELECT * FROM personnel;
app.get('/enumeratepersonnel', (req, res) => {
    knex.select('*')
        .from('personnel')
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) =>
        res.status(404).json({
          message: "The data you are looking for could not be found. Please try again",
        })
      );
    
});

// Get a specific person by man number.
// SELECT * FROM personnel WHERE man_number=":manNumber";
app.get('/getpersonnel/:manNumber', (req, res) => {
    knex.select('*')
        .from('personnel')
        .where({man_number: req.params.manNumber})
        .returning('*')
        .then((data) => {
            if (data.length ===1) {
                res.status(200).json(data[0])
            }
            else if (data.length === 0) {
                res.status(404).json({
                    message:"Personnel Man Number not found."
                })
            }
        })
        .catch((err) =>
        res.status(404).json({
          message: "The data you are looking for could not be found. Please try again",
        })
      );
    
});

//add in a new person with first name, last name, man number 
/*insert into personnel values ( man_number, fname, lname)
schema: table.integer('man_number').primary();
            table.string('fname', 256);
            table.string('lname', 256); )
*/

app.post('addpersonnel/:manNumber/:fName/:lName', function (req,res) => {
    if (req.params.manNumber && req.params.fName && req.params.lName) {
        knex('personnel')
        .insert({
            man_number: req.params.manNumber,
            fname: req.params.fName,
            lname: req.params.lName
        })
        .returning('*')
        .then((data) => res.status(200).json(data))
        .catch((err) => {
            res.status(500).json({message: "Could not update the database."});
        });
    }
 }
)



//Get all hardware with ability to query by nsn or pn if they are provided as query parameters
//SELECT * FROM hardware WHERE nsn = ":nsn"
app.get('/gethardware', function (req, res){
    if (req.query.nsn) {
    knex.select('*')
    .from('hardware')
    .where({nsn: req.query.nsn})
    .then((data) => {
        if (data.length ===1) {
            res.status(200).json(data[0])
        }
        else if ( data.length === 0) {
            res.status(404).json({
                message:"Tool Id not found."
            })
        }
    })
    .catch((err) =>
    res.status(404).json({
      message: "The data you are looking for could not be found. Please try again",
    })
  );
} else if (req.query.pn) {
    knex.select('*')
    .from('hardware')
    .where({pn: req.query.pn})
    .then((data) => {
        if (data.length ===1) {
            res.status(200).json(data[0])
        }
        else if ( data.length === 0) {
            res.status(404).json({
                message:"Tool Id not found."
            })
        }
    })
    .catch((err) =>
    res.status(404).json({
      message: "The data you are looking for could not be found. Please try again",
    })
  );

} else {
    knex.select('*')
    .from ('hardware')
    .then ((data) => {
        res.status(200).json(data)
    })
}
})

//add in new hardware 
//insert into hardware values (
    /*  table.integer('nsn').primary();
            table.string('pn', 100);
            table.string('descr');
            table.string('location');
            table.string('unit_of_measure');
            table.integer('qty_available');
            table.integer('qty_low_threshold');
    */
//)

app.post('/addhardware/:nsn/:pn/:descr/:location/:unit_of_measure/:qty_available/:qty_low_threshold', function(req,res){
    if (req.params.nsn && req.params.pn && req.params.descr && req.params.location 
        && req.params.unit_of_measure && req.params.qty_available && 
        req.params.qty_low_threshold)  {
            knex('hardware')
            .insert ({
                nsn: req.params.nsn,
                pn: req.params.pn,
                descr: req.params.descr,
                location: req.params.location,
                unit_of_measure: req.params.unit_of_measure,
                qty_available: req.params.qty_available,
                qty_low_threshold: req.params.qty_low_threshold
            }
            )
            .returning('*')
            .then ((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({message: "Could not update the database."});
            });

        }
        else {
            res.status(400).json ({
                message: 'Invalid input, check input data' 
            })
        }
})


// Check out a tool, given the tool id, and man number of the person checking out the tool.
// UPDATE tools SET checked_out_to=':manNumber' WHERE tool_id=':toolId';

app.patch('/checkouttool/:toolId/:manNumber', function(req,res) {
    let result;
    if (req.params.toolId && req.params.manNumber) {
        knex('tools')
            .where({ tool_id: req.params.toolId})
            .update({checked_out_to: req.params.manNumber})
            .returning('*')
            .then((data) => {
                if(data.length === 1) {
                    res.status(200).json(data);
                }
                else if(data.length === 0) {
                    res.status(404).json({message: "Not found."});
                }
                else {
                    res.status(500).json({message: "Das not good homie."});
                }
            })
            .catch((err) => {
                res.status(500).json({message: "Could not update the database."});
            });

    }
    else {
        res.status(402).json({message: "Bad request."});
    }

});

// Check in a tool, given the tool id.
// UPDATE tools SET checked_out_to=NULL WHERE tool_id=':toolId';
app.patch('/checkintool/:toolId', function(req,res) {
    
    if (req.params.toolId) {
        knex('tools')
            .where({ tool_id: req.params.toolId})
            .update({checked_out_to: null})
            .returning('*')
            .then((data) => {
                if(data.length === 1) {
                    res.status(200).json(data);
                }
                else if(data.length === 0) {
                    res.status(404).json({message: `Cannot find ${req.params.toolId}.`});
                }
                else {
                    res.status(500).json({message: "Das not good homie."});
                }
            })
            .catch((err) => {
                res.status(500).json({message: "Could not update the database."});
            });

    }
    else {
        res.status(402).json({message: "Bad request."});
    }

});

//Get a list of all the tools are checkedout
//SELECT * FROM tools where checked_out_to IS NOT FALSE 

app.get('/getcheckedouttools', function (req,res){
    knex.select('*')
    .from('tools')
    .whereNotNull('checked_out_to')
    .then((data) => {
        res.status(200).json(data)
        });
})

// Get a list of all the tools checked out to a particular person.
// SELECT * FROM tools WHERE checked_out_to=':manNumber';
app.get('/checkedouttoperson/:manNumber', (req, res) => {
    knex.select('*')
        .from('tools')
        .where({checked_out_to: req.params.manNumber})
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) =>
        res.status(404).json({
          message: "The data you are looking for could not be found. Please try again",
        })
      );
    
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}.`)
});