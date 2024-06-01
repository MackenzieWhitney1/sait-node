const greetingsArr = [
    "trumanShow", 
    "demolitionMan", 
    "billTed"]; 

exports.randomGreeting = () => {return greetingsArr[Math.floor(Math.random()*greetingsArr.length)]};

