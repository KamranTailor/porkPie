router.post('/addUser', async (request, response) => {
    const fname = request.body.fname; // First Name
    const mname = request.body.mname; // Middle Name
    const lname = request.body.lname; // Last Name
    const passwordll = request.body.password; // Corrected from request.body.username
    const dob = request.body.dob; // Date of birth
    const clinetApri = "false";
  
    let username = `${lname.toLowerCase()}${dob.split("-")[0]}`; // lastName,yearborn
    // Check if username is already in use in data/userData.json
    const userData = JSON.parse(fs.readFileSync("data/userData.json", "utf8"));
  
    let isUsernameTaken = userData.some(user => user.username === username);
    let suffix = "a";
    while (isUsernameTaken) {
      username = `${lname.toLowerCase()}${dob.split("-")[0]}${suffix}`;
      isUsernameTaken = userData.some(user => user.username === username);
      suffix = String.fromCharCode(suffix.charCodeAt(0) + 1);
    }
  
    //User ID
    var maxUserId = 0; // Initialize maxUserId as a number
    for (var i = 0; i < userData.length; i++) {
      if (Number(userData[i].userid) > maxUserId) { // Convert to number here
        maxUserId = Number(userData[i].userid); // Convert to number here
      }
    }
    var userid = String(maxUserId + 1); // Increment as a number, then convert to string
  
    //User SSC 
    const userSSC = generateRandomCode(4);
    const password = hashPassword(passwordll);
  
    const newUser = {
      fname,
      mname,
      lname,
      password,
      dob,
      clinetApri,
      username,
      userid,
      userSSC
    };
  
    userData.push(newUser);
    fs.writeFileSync("data/userData.json", JSON.stringify(userData, null, 2));
  
    delete newUser.userSSC;
    delete newUser.password;
    return response.json({ message: true, content: newUser });
  });