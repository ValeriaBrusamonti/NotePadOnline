



document.getElementById("btnAccedi").addEventListener("click",Accedi);
function Accedi()
{
    Blur();
    Disable();
    document.getElementById("accedi").style.filter = "blur(0px)";
    document.getElementById("accedi").style.visibility = "visible";
    document.getElementById("registrazione").style.filter = "blur(0px)";
    document.getElementById("registrazione").style.visibility = "visible";
}
function Blur()
{
    document.getElementById("bloccouno").style =" filter: blur(6px)";
    document.getElementById("bloccodue").style =" filter: blur(6px)";
    document.getElementById("bloccotre").style =" filter: blur(6px)";
    document.getElementById("header").style =" filter: blur(6px)";
    document.getElementById("footer").style =" filter: blur(6px)";

}

function Disable()
{
    document.getElementById("bloccouno").disabled=true;
    document.getElementById("bloccodue").disabled=true;
    document.getElementById("bloccotre").disabled=true;
    document.getElementById("header").disabled=true;
    document.getElementById("footer").disabled=true;
}