prediction_1 = "";
Webcam.set({
    width:350,
    height:350,
    format:"jpeg",
    jpeg_quality:90,
    flip_horiz:true
});
camera = document.getElementById("camera");

Webcam.attach("#camera");

function capImage(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src='+data_uri+'>'
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Usx9MHcIY/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded")
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is "+ prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function snapImage(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("update_emoji_name").innerHTML = "&#x1F44C;"
        }
        if(results[0].label == "Good"){
            document.getElementById("update_emoji_name").innerHTML = "&#x1F44D;"
        } 
        if(results[0].label == "Peace"){
            document.getElementById("update_emoji_name").innerHTML = "&#9996;"
        }
        if(results[0].label == "Fail"){
            document.getElementById("update_emoji_name").innerHTML = "&#x1F44E;"
        }
    }
}