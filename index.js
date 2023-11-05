const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 80;
app.use('/satic', express.static('static'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const { connectToDatabase, MentorshipForm, ContactFormManager } = require('./db')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/Home', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/VideoEditor', (req, res) => {
  res.sendFile(path.join(__dirname, 'VideoEditing.html'));
});
app.get('/AudioMixing', (req, res) => {
  res.sendFile(path.join(__dirname, 'AudioMixing.html'));
});
app.get('/Gaming', (req, res) => {
  res.sendFile(path.join(__dirname, 'Gaming.html'));
});
app.get('/YouTube', (req, res) => {
  res.sendFile(path.join(__dirname, 'YouTube.html'));
});
app.get('/Engineering', (req, res) => {
  res.sendFile(path.join(__dirname, 'Engineering.html'));
});


app.get('/Contact-Success', (req, res) => {
  const alertMessage = `
        <div class="alert alert-warning alert-dismissible fade show" style="margin:0 0 0 0;" role="alert">
          <strong>Contacrt Form submitted!</strong>You will get a call from us soon
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.send('An error occurred.');
    } else {
      // Inject the alert message into the HTML
      const updatedHtml = data.replace('<div id="alert-message"></div>', alertMessage);
      res.send(updatedHtml);
    }
  });
});
app.get('/Contact-Failed', (req, res) => {
  const alertMessage = `
        <div class="alert alert-danger alert-dismissible fade show" style="margin:0 0 0 0;" role="alert">
          <strong>Sorry, this doesnt usually happen!</strong> Seems like we are experiencing server issues, we will fix this soon..
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.send('An error occurred.');
    } else {
      // Inject the alert message into the HTML
      const updatedHtml = data.replace('<div id="alert-message"></div>', alertMessage);
      res.send(updatedHtml);
    }
  });
});
app.get('/Mentorship-Success', (req, res) => {
  const alertMessage = `
        <div class="alert alert-warning alert-dismissible fade show" style="margin:0 0 0 0;" role="alert">
          <strong>Thanks for choosing us!</strong> Your Session is Confirmed, you will get a call from us soon
          <button type="button"  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.send('An error occurred.');
    } else {
      // Inject the alert message into the HTML
      const updatedHtml = data.replace('<div id="alert-message"></div>', alertMessage);
      res.send(updatedHtml);
    }
  });
});
app.get('/Mentorship-Failed', (req, res) => {
  const alertMessage = `
        <div class="alert alert-danger alert-dismissible fade show" style="margin:0 0 0 0;" role="alert">
          <strong>Sorry, this doesnt usually happen!</strong> Seems like we are experiencing server issues, we will fix this soon..
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.send('An error occurred.');
    } else {
      // Inject the alert message into the HTML
      const updatedHtml = data.replace('<div id="alert-message"></div>', alertMessage);
      res.send(updatedHtml);
    }
  });
});

connectToDatabase();

app.post('/BookMentorship', async (req, res) => {
  const { myName, myEmail, myTel, myCareer } = req.body;
  if (myName === "" || myTel === null || myEmail === "" || myCareer === "") {
    res.send('<script>alert("Please Enter all Details"); window.location = "/";</script>');
  }
  const rsp = await MentorshipForm(myName, myEmail, myTel, myCareer);
  if (rsp == 'Succesful') {
    // Append the alert message to the HomeBeta.html and send it
    res.redirect('/Mentorship-Success');
  }
  else {
    res.redirect('/Mentorship-Failed');
  }
});

app.post('/Contact', async (req, res) => {
  const { myName1, myEmail1, myTel1, myMess1 } = req.body;
  if (myName1 === "" || myEmail1 === "" || myTel1 === "" || myMess1 === "") {
    res.send('<script>alert("Please Enter all Details"); window.location = "/";</script>');
  }
  else {
    const rsp = await ContactFormManager(myName1, myEmail1, myTel1, myMess1);
    if (rsp == 'Failed') {
      res.redirect('/Contact-Success');
    }
    else if (rsp == 'Succesful') {
      res.redirect('/Contact-Failed');
    }
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});