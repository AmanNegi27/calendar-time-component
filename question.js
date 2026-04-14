// ====== SOLUTION STEPS ======
const stepsData = [

`<b>Step 1: Given Values</b><br>
\\[
\\lambda_0 = 20, \\quad \\lambda_F = 1, \\quad \\theta = 0.025
\\]`,

`<b>Step 2: Number of Failures (\\Delta \\mu)</b><br>
\\[
\\Delta \\mu = \\frac{1}{\\theta} \\ln \\left( \\frac{\\lambda_0}{\\lambda_F} \\right)
\\]`,

`<b>Substitute values</b><br>
\\[
\\Delta \\mu = \\frac{1}{0.025} \\ln \\left( \\frac{20}{1} \\right) = 119 \\text{ failures}
\\]`,

`<b>Step 3: Execution Time (\\Delta \\tau)</b><br>
\\[
\\Delta \\tau = \\frac{1}{\\theta} \\left( \\frac{1}{\\lambda_F} - \\frac{1}{\\lambda_0} \\right)
\\]`,

`<b>Substitute values</b><br>
\\[
\\Delta \\tau = \\frac{1}{0.025} \\left( 1 - \\frac{1}{20} \\right) = 38 \\text{ CPU hrs}
\\]`,

`<b>Step 4: Resource Calculation</b><br>
\\[
X_I = \\mu_I \\Delta \\mu + \\theta_I \\Delta \\tau
\\]
\\[
= 1(119) + 2(38) = 195 \\text{ Person hrs}
\\]`,

`\\[
X_F = \\mu_F \\Delta \\mu = 5(119) = 595 \\text{ Person hrs}
\\]`,

`\\[
X_C = \\mu_C \\Delta \\mu + \\theta_C \\Delta \\tau
\\]
\\[
= 1(119) + 1.5(38) = 176 \\text{ CPU hrs}
\\]`,

`<b>Step 5: Case (b) New Failure Intensity</b><br>
\\[
\\lambda_F = 0.5
\\]`,

`\\[
\\Delta \\mu = \\frac{1}{0.025} \\ln \\left( \\frac{20}{0.5} \\right) = 148 \\text{ failures}
\\]`,

`\\[
\\Delta \\tau = \\frac{1}{0.025} \\left( \\frac{1}{0.5} - \\frac{1}{20} \\right) = 78 \\text{ CPU hrs}
\\]`,

`\\[
X_I = 1(148) + 2(78) = 304 \\text{ Person hrs}
\\]`,

`\\[
X_F = 5(148) = 740 \\text{ Person hrs}
\\]`,

`\\[
X_C = 1(148) + 1.5(78) = 265 \\text{ CPU hrs}
\\]`,

`<b>Final Observation</b><br>
Cutting failure intensity to half does not double the resources. 
The increase is less and follows a logarithmic growth pattern.`
];

// ====== SETTINGS ======
const typingSpeed = 15;   // slow typing
const stepDelay = 2500;   // delay between steps

const container = document.getElementById("solution");

// ====== TYPEWRITER FIXED FUNCTION ======
function typeHTML(element, html) {

    const temp = document.createElement("div");
    temp.innerHTML = html;
    const text = temp.innerText;

    function typeChar(i) {
        if (i < text.length) {
            element.innerText += text.charAt(i);
            setTimeout(() => typeChar(i + 1), typingSpeed);
        } else {
            element.innerHTML = html;
            element.classList.remove("typing");

            if (window.MathJax) {
                MathJax.typesetPromise([element]);
            }
        }
    }

    typeChar(0);
}

// ====== SHOW STEPS ======
function showSteps() {
    stepsData.forEach((step, i) => {
        setTimeout(() => {

            const stepDiv = document.createElement("div");
            stepDiv.classList.add("step", "typing");

            container.appendChild(stepDiv);

            setTimeout(() => {
                stepDiv.classList.add("show");
            }, 100);

            typeHTML(stepDiv, step);

        }, i * stepDelay);
    });
}

// ====== START ======
showSteps();