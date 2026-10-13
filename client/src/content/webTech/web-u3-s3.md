### 1. Native Multimedia (<video> and <audio> APIs)

HTML5 eliminates third-party plugins by embedding media directly in the DOM:

```html
<!-- Native HTML5 Video Element with Multi-Codec Fallback & Subtitles -->
<video width="640" height="360" controls poster="poster_image.jpg" preload="metadata">
  <source src="lecture.mp4" type="video/mp4">
  <source src="lecture.webm" type="video/webm">
  <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
  Your browser does not support native HTML5 video playback.
</video>

<!-- Native HTML5 Audio Element -->
<audio controls preload="auto">
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
```

---

### 2. Modern HTML5 Form Inputs & Attributes

HTML5 modernized forms with built-in client-side validation without requiring custom JavaScript:

```html
<form action="/submit_admission" method="POST">
  <!-- Email validation with regex check -->
  <label for="email">University Email:</label>
  <input type="email" id="email" name="email" placeholder="student@mmumullana.org" required>

  <!-- Numeric bounds -->
  <label for="age">Age (17-30):</label>
  <input type="number" id="age" name="age" min="17" max="30" required>

  <!-- Slider input -->
  <label for="scale">Skill Level (1-10):</label>
  <input type="range" id="scale" name="skill" min="1" max="10" value="7">

  <!-- Native Date Picker -->
  <label for="dob">Date of Birth:</label>
  <input type="date" id="dob" name="dob">

  <!-- Datalist Autocomplete -->
  <label for="course">Choose Branch:</label>
  <input list="branchList" id="course" name="branch">
  <datalist id="branchList">
    <option value="Computer Science & Engineering">
    <option value="Information Technology">
    <option value="Mechanical Engineering">
  </datalist>

  <button type="submit">Submit Application</button>
</form>
```