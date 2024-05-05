// That god damn calendar
      function updateCalendar() {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();

        const calendarDays = document.querySelectorAll('.calendar-day');

        calendarDays.forEach(day => {
          day.classList.remove('current-day-dot');
          if (parseInt(day.textContent) === currentDay) {
            day.classList.add('current-day-dot');
          }
        });
      }

      updateCalendar();

      // Function to update the clock
      function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const meridiem = hours >= 12 ? ' PM' : ' AM';

        // converts hours to 12-hour 
        const formattedHours = hours % 12 || 12;

        const timeString = `${formattedHours}:${padZero(minutes)}:${padZero(seconds)}${meridiem}`;
        document.querySelector('.clock').textContent = timeString;
      }

      function padZero(number) {
        return number < 10 ? '0' + number : number;
      }

      // Update the clock every second
      setInterval(updateClock, 1000);

      // Call the function once to initialize the clock
      updateClock();

      const windows = document.querySelectorAll('.window');
      windows.forEach(window => {
        window.addEventListener('mousedown', startDragging);
      });



      let offsetX, offsetY;

      function startDragging(e) {
        const window = e.target.closest('.window');
        const rect = window.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        window.style.zIndex = '1000';

        function dragWindow(event) {
          const newX = event.clientX - offsetX;
          const newY = event.clientY - offsetY;
          window.style.left = `${newX}px`;
          window.style.top = `${newY}px`
        }

        function stopDragging() {
          document.removeEventListener('mousemove', dragWindow);
          document.removeEventListener('mouseup', stopDragging);
        }

        document.addEventListener('mousemove', dragWindow);
        document.addEventListener('mouseup', stopDragging);
      }


      function addToCalc(value) {
        const inputField = document.getElementById('calcInput');
        inputField.value += value;
      }

      function clearCalc() {
        const inputField = document.getElementById('calcInput');
        inputField.value = '';
      }

      function calculate() {
        const inputField = document.getElementById('calcInput');
        const expression = inputField.value;
        try {
          const result = eval(expression);
          inputField.value = result;
        } catch (error) {
          inputField.value = 'Error';
        }
      }

      function openWindow(windowName) {
        const windowSelector = '.' + windowName + '-window';
        const existingWindow = document.querySelector(windowSelector + ':not([style*="display: none"])');

        if (existingWindow) {
          alert(windowName.charAt(0).toUpperCase() + windowName.slice(1) + " window is already open.");
        } else {
          const newWindow = document.createElement('div');
          newWindow.classList.add('window', windowName + '-window');
          newWindow.style.top = '20px';
          newWindow.style.left = '20px';
          newWindow.innerHTML = `
            <div class="window-titlebar">
                <div class="window-title">${windowName.charAt(0).toUpperCase() + windowName.slice(1)}</div>
                <div class="window-buttons">
                    <img src="https://files.catbox.moe/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
                </div>
            </div>
            ${windowName === 'calculator' ? `
                <input type="text" id="calcInput" readonly>
                <br>
                <button onclick="addToCalc('1')">1</button>
                <button onclick="addToCalc('2')">2</button>
                <button onclick="addToCalc('3')">3</button>
                <button onclick="addToCalc('+')">+</button>
                <br>
                <button onclick="addToCalc('4')">4</button>
                <button onclick="addToCalc('5')">5</button>
                <button onclick="addToCalc('6')">6</button>
                <button onclick="addToCalc('-')">-</button>
                <br>
                <button onclick="addToCalc('7')">7</button>
                <button onclick="addToCalc('8')">8</button>
                <button onclick="addToCalc('9')">9</button>
                <button onclick="addToCalc('*')">*</button>
                <br>
                <button onclick="addToCalc('0')">0</button>
                <button onclick="addToCalc('.')">.</button>
                <button onclick="clearCalc()">C</button>
                <button onclick="calculate()">=</button>
            ` : windowName === 'calendar' ? `
                <div class="calendar">
                    <div class="calendar-day">Sun<span class="current-day-dot"></span></div>
                    <div class="calendar-day">Mon</div>
                    <div class="calendar-day">Tue</div>
                    <div class="calendar-day">Wed</div>
                    <div class="calendar-day">Thu</div>
                    <div class="calendar-day">Fri</div>
                    <div class="calendar-day">Sat</div>
                    <div class="calendar-day">1</div>
                    <div class="calendar-day">2</div>
                    <div class="calendar-day">3</div>
                    <div class="calendar-day">4</div>
                    <div class="calendar-day">5</div>
                    <div class="calendar-day">6</div>
                    <div class="calendar-day">7</div>
                    <div class="calendar-day">8</div>
                    <div class="calendar-day">9</div>
                    <div class="calendar-day">10</div>
                    <div class="calendar-day">11</div>
                    <div class="calendar-day">12</div>
                    <div class="calendar-day">13</div>
                    <div class="calendar-day">14</div>
                    <div class="calendar-day">15</div>
                    <div class="calendar-day">16</div>
                    <div class="calendar-day">17</div>
                    <div class="calendar-day">18</div>
                    <div class="calendar-day">19</div>
                    <div class="calendar-day">20</div>
                    <div class="calendar-day">21</div>
                    <div class="calendar-day">22</div>
                    <div class="calendar-day">23</div>
                    <div class="calendar-day">24</div>
                    <div class="calendar-day">25</div>
                    <div class="calendar-day">26</div>
                    <div class="calendar-day">27</div>
                    <div class="calendar-day">28</div>
                    <div class="calendar-day">29</div>
                    <div class="calendar-day">30</div>
                    <div class="calendar-day">31</div>
                </div>
            ` : windowName === 'about' ? `
                <img src="https://files.catbox.moe/0950ou.png" alt="About Image" draggable="false" style="max-width: 100%; height: auto;">
                <p>Hi there! I'm Lunarion. I'm a 16-year-old high-schooler who has a passion for programming. Feel free to contact me!</p>
                <button class="contact-btn" onclick="openContactWindow()" style="border: 2px outset #c8c7c7;">Contact</button>
                <button class="projects-btn" onclick="openWindow('projects')" style="border: 2px outset #c8c7c7;">Projects</button>
            ` : `
                <textarea rows="6" placeholder="Type your notes here..."></textarea>
             ` : windowName === 'contact' ? `
              <div class="window-titlebar">
              <div class="window-title">Contact Me</div>
              <div class="window-buttons">
              <img src="https://files.catbox.moe/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
              </div>
              </div>
    	        <div class="window-content">
              <p>You can contact me via:</p>
              <ul>
              <li>Email: <a href="mailto:theturtleinwater@gmail.com">theturtleinwater@gmail.com</a></li>
              <li>Discord: lnarion</li>
              <li>Matrix: <a href="https://matrix.com/@lnarin">@lnarin:matrix.com</a></li>
              <li>Phone: hi osama </li>
            </ul>
        </div>
    </div>`;
          document.body.appendChild(newWindow);
          makeDraggable(newWindow);
        }
      }
      function closeWindow(button) {
        const window = button.closest('.window');
        window.remove();
      }

      function makeDraggable(window) {
        window.addEventListener('mousedown', startDragging);
      }

      function reopenAboutMe() {
        const aboutWindow = document.querySelector('.about-window');
        if (aboutWindow) {
          aboutWindow.remove();
        }
        openWindow('about');
      }
    <div id="stars-container"></div>

    function openProjectWindow() {
        const projectWindow = document.createElement('div');
        projectWindow.classList.add('window', 'project-window');
        projectWindow.style.top = '20px';
        projectWindow.style.left = '20px';
        projectWindow.innerHTML = ``;

          class AsciiEffect {

            constructor(renderer, charSet = ' .:-=+*#%@', options = {}) {

              // ' .,:;=|iI+hHOE#`$'
              // darker bolder character set from https://github.com/saw/Canvas-ASCII-Art/
              // ' .'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'.split('');

              // Some ASCII settings

              const fResolution = options['resolution'] || 0.15; // Higher for more details
              const iScale = options['scale'] || 1;
              const bColor = options['color'] || false; // nice but slows down rendering!
              const bAlpha = options['alpha'] || false; // Transparency
              const bBlock = options['block'] || false; // blocked characters. like good O dos
              const bInvert = options['invert'] || false; // black is white, white is black
              const strResolution = options['strResolution'] || 'low';

              let width, height;

              const domElement = document.createElement('div');
              domElement.style.cursor = 'default';

              const oAscii = document.createElement('table');
              domElement.appendChild(oAscii);

              let iWidth, iHeight;
              let oImg;

              this.setSize = function(w, h) {

                width = w;
                height = h;

                renderer.setSize(w, h);

                initAsciiSize();

              };


              this.render = function(scene, camera) {

                renderer.render(scene, camera);
                asciifyImage(oAscii);

              };

              this.domElement = domElement;


              // Throw in ascii library from https://github.com/hassadee/jsascii/blob/master/jsascii.js (MIT License)

              function initAsciiSize() {

                iWidth = Math.floor(width * fResolution);
                iHeight = Math.floor(height * fResolution);

                oCanvas.width = iWidth;
                oCanvas.height = iHeight;
                // oCanvas.style.display = "none";
                // oCanvas.style.width = iWidth;
                // oCanvas.style.height = iHeight;

                oImg = renderer.domElement;

                if (oImg.style.backgroundColor) {

                  oAscii.rows[0].cells[0].style.backgroundColor = oImg.style.backgroundColor;
                  oAscii.rows[0].cells[0].style.color = oImg.style.color;

                }

                oAscii.cellSpacing = 0;
                oAscii.cellPadding = 0;

                const oStyle = oAscii.style;
                oStyle.whiteSpace = 'pre';
                oStyle.margin = '0px';
                oStyle.padding = '0px';
                oStyle.letterSpacing = fLetterSpacing + 'px';
                oStyle.fontFamily = strFont;
                oStyle.fontSize = fFontSize + 'px';
                oStyle.lineHeight = fLineHeight + 'px';
                oStyle.textAlign = 'left';
                oStyle.textDecoration = 'none';

              }


              const aDefaultCharList = (' .,:;i1tfLCG08@').split('');
              const aDefaultColorCharList = (' CGO08@').split('');
              const strFont = 'courier new, monospace';

              const oCanvasImg = renderer.domElement;

              const oCanvas = document.createElement('canvas');
              if (!oCanvas.getContext) {

                return;

              }

              const oCtx = oCanvas.getContext('2d');
              if (!oCtx.getImageData) {

                return;

              }

              let aCharList = (bColor ? aDefaultColorCharList : aDefaultCharList);

              if (charSet) aCharList = charSet;

              // Setup dom

              const fFontSize = (2 / fResolution) * iScale;
              const fLineHeight = (2 / fResolution) * iScale;

              // adjust letter-spacing for all combinations of scale and resolution to get it to fit the image width.

              let fLetterSpacing = 0;

              if (strResolution == 'low') {

                switch (iScale) {

                  case 1:
                    fLetterSpacing = -1;
                    break;
                  case 2:
                  case 3:
                    fLetterSpacing = -2.1;
                    break;
                  case 4:
                    fLetterSpacing = -3.1;
                    break;
                  case 5:
                    fLetterSpacing = -4.15;
                    break;

                }

              }

              if (strResolution == 'medium') {

                switch (iScale) {

                  case 1:
                    fLetterSpacing = 0;
                    break;
                  case 2:
                    fLetterSpacing = -1;
                    break;
                  case 3:
                    fLetterSpacing = -1.04;
                    break;
                  case 4:
                  case 5:
                    fLetterSpacing = -2.1;
                    break;

                }

              }

              if (strResolution == 'high') {

                switch (iScale) {

                  case 1:
                  case 2:
                    fLetterSpacing = 0;
                    break;
                  case 3:
                  case 4:
                  case 5:
                    fLetterSpacing = -1;
                    break;

                }

              }


              // can't get a span or div to flow like an img element, but a table works?


              // convert img element to ascii

              function asciifyImage(oAscii) {

                oCtx.clearRect(0, 0, iWidth, iHeight);
                oCtx.drawImage(oCanvasImg, 0, 0, iWidth, iHeight);
                const oImgData = oCtx.getImageData(0, 0, iWidth, iHeight).data;

                // Coloring loop starts now
                let strChars = '';

                // console.time('rendering');

                for (let y = 0; y < iHeight; y += 2) {

                  for (let x = 0; x < iWidth; x++) {

                    const iOffset = (y * iWidth + x) * 4;

                    const iRed = oImgData[iOffset];
                    const iGreen = oImgData[iOffset + 1];
                    const iBlue = oImgData[iOffset + 2];
                    const iAlpha = oImgData[iOffset + 3];
                    let iCharIdx;

                    let fBrightness;

                    fBrightness = (0.3 * iRed + 0.59 * iGreen + 0.11 * iBlue) / 255;
                    // fBrightness = (0.3*iRed + 0.5*iGreen + 0.3*iBlue) / 255;

                    if (iAlpha == 0) {

                      // should calculate alpha instead, but quick hack :)
                      //fBrightness *= (iAlpha / 255);
                      fBrightness = 1;

                    }

                    iCharIdx = Math.floor((1 - fBrightness) * (aCharList.length - 1));

                    if (bInvert) {

                      iCharIdx = aCharList.length - iCharIdx - 1;

                    }

                    // good for debugging
                    //fBrightness = Math.floor(fBrightness * 10);
                    //strThisChar = fBrightness;

                    let strThisChar = aCharList[iCharIdx];

                    if (strThisChar === undefined || strThisChar == ' ')
                      strThisChar = '&nbsp;';

                    if (bColor) {

                      strChars += '<span style='' +
                        'color:rgb(' + iRed + ',' + iGreen + ',' + iBlue + ');' +
                        (bBlock ? 'background-color:rgb(' + iRed + ',' + iGreen + ',' + iBlue + ');' : '') +
                        (bAlpha ? 'opacity:' + (iAlpha / 255) + ';' : '') +
                        ''>' + strThisChar + '</span>';

                    } else {

                      strChars += strThisChar;

                    }

                  }

                  strChars += '<br/>';

                }

                oAscii.innerHTML = `<tr><td style="display:block;width:${width}px;height:${height}px;overflow:hidden">${strChars}</td></tr>`;

                // console.timeEnd('rendering');

                // return oAscii;

              }
            }

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 40);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(1000, 1000);
            const effect = new AsciiEffect(renderer, ' .:-+*=%@#', {
              invert: true
            });
            effect.setSize(1000, 1000);
            effect.domElement.style.color = 'white';
            effect.domElement.style.backgroundColor = 'black';
            document.body.appendChild(effect.domElement);

            const radius = 5;
            const widthSegments = 32;
            const heightSegments = 16;
            const globeGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);



            const globeMaterial = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              wireframe: true
            });

            const globe = new THREE.Mesh(globeGeometry, globeMaterial);
            scene.add(globe);


            camera.position.z = 10;

            function animate() {
              requestAnimationFrame(animate);


              // Rotate the globe
              globe.rotation.y += 0.01;

              effect.render(scene, camera);
            }
          }

            animate();
            document.body.appendChild(projectWindow);
            makeDraggable(projectWindow);
        }


            // Generate stars
            const container = document.getElementById('stars-container');
            const numStars = 900;

            function createStar() {
              const star = document.createElement('div');
              star.classList.add('star');

              // Randomly assign color
              const randomColor = Math.random();
              if (randomColor < 0.3) {
                star.classList.add('white');
              } else if (randomColor < 0.6) {
                star.classList.add('blue');
              } else {
                // You can add more colors here if needed
                // star.classList.add('otherColor');
              }

              star.classList.add('cross');
              star.style.left = `${Math.random() * 100}vw`;
              star.style.top = `${Math.random() * 100}vh`;
              container.appendChild(star);
            }

            // Start animation
            for (let i = 0; i < numStars; i++) {
              createStar();
            }
