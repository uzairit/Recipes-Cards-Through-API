let data = JSON.parse(localStorage.getItem('recipe'))
document.getElementById('box').innerHTML = `        
        <div id="left"><img src="${data.image}" alt=""></div>
        <div id="right">        
                <h1>${data.name}</h1>
                <p><strong>Cuisine:</strong> ${data.cuisine}</p>
                <p><strong>Difficulty:</strong> ${data.difficulty}</p>
                <p><strong>Prepair Time:</strong> ${data.prepTimeMinutes}</p>                
                <p><strong>Meal Type:</strong> ${data.mealType}</p>               
                <p><strong>Calories Per Serving:</strong> ${data.caloriesPerServing}</p>                
                <p><strong>Ingredients:</strong> ${data.ingredients.join(', ')}</p>                
                <p><strong>Instruction:</strong> ${data.instructions.join(' ')}</p>                
            </div>
        `