# Library Value of Usage Calculator

This tool allows your end users to calculate the  value of their regular library use.

# How to Use

Download the library-calculator.js file and link to it in your template.

add the following html element to the page you want the calculator to show
`<div id="library-usage-calculator"></div>`

To configure the headings and rows you can modify the following example and 
add it to your template in the `<head>` section of your template.

```javascript
<script>
window.calculatorConfig = {
    "headings": [
        "Input Your Use",
        "Library Services",
        "Value of Use"
    ],
    "items": [
        {
            "label": "Books Borrowed",
            "cost": 27.7
        },
        {
            "label": "Audiobooks Borrowed",
            "cost": 84.84
        },
        {
            "label": "eBooks/Audiobooks Downloaded",
            "cost": 43.15
        },
        {
            "label": "Magazines or Newspapers Borrowed",
            "cost": 7.75
        },
        {
            "label": "DVDs Borrowed",
            "cost": 25.15
        },
        {
            "label": "CDs Borrowed",
            "cost": 25.15
        },
        {
            "label": "Databases or Articles Accessed",
            "cost": 24
        },
        {
            "label": "Streaming Movies or Learning Videos Viewed",
            "cost": 20
        },
        {
            "label": "Meeting Room Use (hours per month)",
            "cost": 50
        },
        {
            "label": "Programmes or Classes Attended",
            "cost": 20
        },
        {
            "label": "Computer Use (hours per month)",
            "cost": 5
        },
        {
            "label": " Questions Answered",
            "cost": 10
        },
        {
            "label": "Digital Help Sessions",
            "cost": 150
        },

    ]
}
</script>
```
#Styling

Only basic styling has been applied so that you can easily customise
the calculator to suit the theme of your website. The following class names are used

```css
.calculator-table /*the main <table> element has this class*/
.calculator-heading-row /*the heading <tr> has this class*/
.calculator-line-item-row /*each line item <tr> has this class*/
.calculator-reset-button /*the button which resets the input values*/
```