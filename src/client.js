const img = document.getElementById("image");
const status = document.getElementsByClassName("status")[0];

const predictImage = async () => {
  const fileSelector = document.getElementById('file-selector');

  status.innerHTML = "Model loading...";
  const model = await mobilenet.load();
  status.innerHTML = "Model is loaded!";

  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;

    if (fileList && fileList[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (res) => {
        img.src = res.target.result;

        setTimeout(async () => {

          const predictions = await model.classify(img);
          status.innerHTML = `<div>${predictions[0].className} - ${predictions[0].probability}</div><br/>
          <div>${predictions[1].className} - ${predictions[1].probability}</div><br/>
          <div>${predictions[2].className} - ${predictions[2].probability}</div>`;
        }, 0);

      };
    }
  });
};

predictImage();
