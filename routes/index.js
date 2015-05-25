var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'ShiCipher' });
});

router.post('/codeMessage', function(req,res){

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

	console.log(req.body);
	var encryptedText = "";
	var key = "";
    if (req.body.typeCode==="Encode"){
    	if (req.body.typeEncode==="One To One"){
    		var randomMapping = randomMap();
    		encryptedText = encode(req.body["message-text"], randomMapping);
    		key = "A";
	    	for (var j in alphabet){
			    key+=randomMapping[alphabet[j]];
			}
    	}
    	else {
    		encryptedText = "Not yet implemented";
    	}
    }
    else {
    	keyCode = req.body["keyCode"];
    	if (isValidKeyCode(keyCode)){
    		var firstLetter = keyCode.slice(0,1);
    		var actualKey = keyCode.slice(1,27);
    		encryptedText = decode(req.body["message-text"],actualKey);
    	}
    	else {
    		encryptedText = "Not yet implemented";
    	}
    }
    res.send({
    			"encryptedText":encryptedText,
    			"key":key
    		});

    
    function randomMap(){
        var remainingLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var mapping = {};
        for (var i = 0; i < 26; i++){
            newIndex = Math.floor(Math.random() * remainingLetters.length);
            mapping[alphabet[i]] = remainingLetters[newIndex];
            remainingLetters.splice(newIndex, 1);
        }
        return mapping;
    }

	function encode(inputText, encryptionType){
	    mapping = encryptionType;
	    encryptedText = '';
	    for (var i = 0, len = inputText.length; i < len; i++){
	        var letter = inputText[i];
	        var isUppercase = false;
	        if (letter == letter.toUpperCase()){
	            letter = letter.toLowerCase();
	            isUppercase = true;
	        }
	        if (alphabet.indexOf(letter) > -1){
	            letter = mapping[letter];
	            if (isUppercase){
	                letter = letter.toUpperCase();   
	            }
	            encryptedText += letter;
	        } else {
	            encryptedText += letter;
	        }
	    }
	    return encryptedText;
	}

    function decode(inputText, decryptionString){
        var newMapping = {};
	    for (var i=0;i<26;i++){
	        newMapping[decryptionString[i]]=alphabet[i];
	    }
	    return encode(inputText,newMapping); 
    }

   	function isValidKeyCode(keyCode){
   		if (keyCode.length===27){
   			return true;
   		}
   		else {
   			return false;
   		}
   	}

   	function expmod(base,exp,mod){
   		if (exp===0){
   			return 1;
   		}
   		if (exp%2===0){
   			return Math.pow(expmod(base,exp/2,mod),2)%mod;
   		}
   		else {
   			return (expmod(base,exp-1,mod)*base)%mod;
   		}
   	}
});

module.exports = router;

/*
function decode(inputText){
    inputText = inputText.replace(',', '');
    inputText = inputText.replace('.', '');
    inputText = inputText.replace('?', '');
    inputText = inputText.replace('\'', '');
    inputText = inputText.replace('\"', '');
    letterFrequencies = {'a': 0.08167, 'b': 0.01492, 'c': 0.02782, 'd': 0.04253, 'e': 0.12702, 'f': 0.02228, 'g': 0.02015, 'h': 0.06094, 'i': 0.06966, 'j': 0.00153, 'k': 0.00772, 'l': 0.04025, 'm': 0.02406, 'n': 0.06749, 'o': 0.07507, 'p': 0.01929, 'q': 0.00095, 'r': 0.05987, 's': 0.06327, 't': 0.09056, 'u': 0.02758, 'v': 0.00978, 'w': 0.02361, 'x': 0.00150, 'y': 0.01974, 'z': 0.00074};
    firstLetterFrequencies = {'a': 0.11602, 'b': 0.04702, 'c': 0.03511, 'd': 0.02670, 'e': 0.02007, 'f': 0.03779, 'g': 0.01950, 'h': 0.07232, 'i': 0.06286, 'j': 0.00597, 'k': 0.00590, 'l': 0.02705, 'm': 0.04383, 'n': 0.02365, 'o': 0.06264, 'p': 0.02545, 'q': 0.00173, 'r': 0.01653, 's': 0.07755, 't': 0.16671, 'u': 0.01487, 'v': 0.00649, 'w': 0.06753, 'x': 0.00017, 'y': 0.0162, 'z': 0.00034};
    var words = inputText.split(" ");

    for (i = 0; i < words.length; i++) {
        words[i]
    }
}
*/