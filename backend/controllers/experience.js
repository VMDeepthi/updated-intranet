import db from '../config/connectiondb.js';

export const postemployeeid = (req, res) => {
  const q = 'SELECT employee_id FROM usermanagement ORDER BY employee_id ';
  db.query(q, (err, result) => {
    if (err) return res.status(500).json('Error occurred!');
    else {
      if (result.length === 0) {
        return res.status(200).json({ employee_id: 1 });
      } else {
        return res.status(200).json({ employee_id: result[0].employee_id + 1 });
      }
    }
  });
};

export const checkempexperience = (req, res) => {
  const { employee_id } = req.body;
  const checkQuery = 'SELECT * FROM usermanagement WHERE employee_id = ?';

  db.query(checkQuery, [employee_id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error executing check query:', checkErr);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (checkResult.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const fetchDataQuery = 'SELECT * FROM usermanagement WHERE employee_id = ?';
    db.query(fetchDataQuery, [employee_id], (fetchErr, fetchResult) => {
      if (fetchErr) {
        console.error('Error executing fetch query:', fetchErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.status(200).json({ success: 'Employee found successfully', data: fetchResult[0] });
    });
  });
};


export const AddExperience = (req, res) => {
  console.log(req.body);
  const {employee_id, designation_type, current_designation, date_of_joining, promotion_title, from_date, rolesandresponsibilities } = req.body.formdata;
  const insert_values = [employee_id, designation_type, date_of_joining, current_designation, promotion_title, from_date, rolesandresponsibilities];

  const insertExperienceQuery = `
    INSERT INTO experience (employee_id, designation_type, date_of_joining, current_designation, promotion_title, from_date, rolesandresponsibilities)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(insertExperienceQuery, insert_values, (err, result) => {
    if (err) {
      console.error('Error adding experience:', err);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    } else {
      console.log('Rows affected:', result.affectedRows);
      return res.json({ success: true, data: 'Experience added successfully' });
    }
  });
};

export const viewexperience = (req, res) => {
  const employee_id = req.body.employee_id;
  const q = `SELECT * FROM experience WHERE employee_id = ? ORDER BY employee_id, from_date`;
  db.query(q, [employee_id], (err, result) => {
    if (err) {
      console.error('Error fetching experience data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      return res.status(200).json(result);
    }
  });
};


export const viewallexperiences = (req, res) => {
  const employee_id = req.body.employee_id;
  const q = `SELECT * FROM experience  `;
  db.query(q,  (err, result) => {
    if (err) {
      console.error('Error fetching experience data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      return res.status(200).json(result);
    }
  });
};


export const getsearchdata = (req, res) => {
  console.log(req.body);
  const { employee_id, current_designation } = req.body;
  let search_query;
  let search_values = [];

  if (employee_id || current_designation) {
    if (employee_id) {
      // Search by employee_id
      search_query = `
        SELECT * FROM experience 
        WHERE employee_id = ?;
      `;
      search_values = [employee_id];
    } else if (current_designation) {
      // Search by current_designation
      search_query = `
        SELECT * FROM experience 
        WHERE current_designation = ?;
      `;
      search_values = [current_designation];
    }
  } else {
    return res.status(400).json({ error: 'Invalid search criteria' });
  }

  db.query(search_query, search_values, (err, result) => {
    if (err) {
      console.error('Error fetching experience data:', err);
      return res.status(500).json({ error: 'Error fetching experience data' });
    }

    console.log(result);
    return res.status(200).json({ result });
  });
};








// export const viewexperience = (req,res) =>{
//   const employee_id = req.body.employee_id;
//   //const q = `select * from experience WHERE employee_id = ?`
//   const q = `select * from experience`
//   console.log(req.body);
//   // db.query(q,[employee_id], (err, result) => {})
//   db.query(q,(err,result)=>{
//       if(err) {
//         console.error('Error fetching experience data:', err);
//        return res.status(500).json({ error: 'Internal server error' });
//       } 
//       else {
//           return res.status(200).json(result)
//       }
//   })
// }

// export const updateexperience = (req, res) => {
//   console.log(req.body);
//   const { employee_id, promotion_title, from_date, description } = req.body; 

//   const update_query = `UPDATE experience SET promotion_title=?, from_date=?, description=? WHERE employee_id=?`;
//   const update_values = [promotion_title, from_date, description, employee_id];

//   db.query(update_query, update_values, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json('Error occurred!');
//     } else {
//       return res.status(200).json('Experience updated successfully');
//     }
//   });
// };


// export const updateexperience = (req, res) => {
//   const { id } = req.params;
//   const { employee_id, promotion_title, from_date, description } = req.body;

//   const update_query = 'UPDATE experience SET promotion_title=?, from_date=?, description=? WHERE id=?';
//   const update_values = [promotion_title, from_date, description, id];

//   db.query(update_query, update_values, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json('Error occurred!');
//     } else if (result.affectedRows === 0) {
//       return res.status(404).json('Experience not found');
//     } else {
//       return res.status(200).json('Experience updated successfully');
//     }
//   });
// };


// export const updateexperience = (req, res) => {
//   const { employee_id, id} = req.params;
//   const { promotion_title, from_date, description } = req.body;
//   console.log('Request Params:', req.params);
//   console.log('Request Body:', req.body);


//   const update_query = 'UPDATE experience SET promotion_title=?, from_date=?, description=? WHERE employee_id=? AND id=?';
//   const update_values = [promotion_title, from_date, description, employee_id, id];

//   db.query(update_query, update_values, (err, result) => {
//     if (err) {
//       console.error('Error updating experience data:', err);
//       return res.status(500).json({ error: 'Error occurred during update', details: err.message });
//     } else if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Experience not found for the given employee_id' });
//     } else {
//       return res.status(200).json({ message: 'Experience updated successfully' });
//     }
//   });
// };


export const updateexperience = (req, res) => {
  console.log('Received update request:', req.params, req.body);
  const {id} = req.params
  const { employee_id, promotion_title, from_date, rolesandresponsibilities } = req.body;
  const update_query = `UPDATE experience SET promotion_title=?, from_date=?, rolesandresponsibilities=? WHERE id=?`;
  const update_values = [promotion_title, from_date, rolesandresponsibilities,id];

  db.query(update_query, update_values, (err, result) => {
    if (err) {
      console.error('Error updating experience data:', err);
      return res.status(500).json({ error: 'Error occurred during update', details: err.message });
    } else {
      console.log('Update result:', result);
      return res.status(200).json({ message: 'Experience updated successfully' });
    }
  });
};

export const deleteexperience = async (req, res) => {
  console.log(req.body);
  const q = 'delete from experience where id in (?)';
  try {
    await db.promise().query(q, [req.body.id]);
    return res.status(200).json('Experience Deleted Successfully');
  } catch {
    return res.status(500).json('error occurred!');
  }
};