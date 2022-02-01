# Installation

* step one: git clone project
* step two: npm install dependencies
* step three: npm run server

# Database Tables

### Users
|attribute|data type|				required			|
|---------|---------|---------------------|
|user_id  |integer  |auto-assigns         |
|username |string   |Yes + must be unique |
|password |string   |Yes                  |
|email    |string   |No                   |

### Recipes
|attribute  |data type|	required		|
|-----------|---------|-------------|
|recipe_id  |integer  |auto-assigns |
|recipe_name|string   |Yes          |
|source_name|string   |Yes          |

### Ingredients
|attribute      |data type|	required   |
|---------------|---------|------------|
|ingredient_id  |integer  |auto-assigns|
|ingredient_name|string   |Yes         |

### Steps
|		attribute  |data type|				required		 |
|--------------|---------|---------------------|
|step_id       |integer  |auto-assigns         |
|recipe_id(FK) |string   |Yes                  |
|step_number   |string   |Yes                  |
|description   |string   |Yes                  |

* FK: foreign key

### Ingredients_Steps
|		attribute      |data type|		required		 |
|------------------|---------|-----------------|
|ingredient_step_id|integer  |auto-assigns     |
|step_id(FK)       |integer  |Yes              |
|ingredient_id(FK) |integer  |Yes              |

* FK: foreign key

### Categories
|attribute      |data type|	     required      |
|---------------|---------|--------------------|
|category_id    |integer  |auto-assigns        |
|category_name  |string   |Yes + must be unique|

### Recipes_Categories
|		attribute      |data type|		required		 |
|------------------|---------|-----------------|
|recipe_category_id|integer  |auto-assigns     |
|recipe_id(FK)     |integer  |Yes              |
|category_id(FK)   |integer  |Yes              |

* FK: foreign key

# API End Points

* BaseUrl = https://bldwk-scrt-rec-api.herokuapp.com/

### Authentication End Points

|Method|Endpoint|Body(required)|Body(optional)|notes|
|----|--------------------|-------------------------|----|--------------------|
|POST|`/api/auth/register`|username, password, email|none|Creates a new user, on sucess returns user_id and username|
|POST|`/api/auth/login`|username, password|none|Logs in user who already exists. On success returns user_id, username, and token|

### Recipe End Points

|Method|Endpoint|Body(required)|Body(optional)|notes|
|-|-|-|-|-|
|GET|`/api/recipes`|nothing|nothing|Returns all available recipes from database|
|GET|`/api/recipes/:id`|nothing|nothing|return recipe object with the id passed through the URL|
|POST|wip|wip|wip|wip|
|PUT|wip|wip|wip|wip|
|DELETE|`/api/recipes/:id`|nothing|nothing|On success returns deletion succesful|

# Meet the Team

**_Roberto Gomez_**  
**_Full Stack Engineer_**  
Linkedin: (https://www.linkedin.com/in/roberto-c-gomez-86a735b6/)  
Github: (https://github.com/itsmerobert12)

**_Sagun Shrestha_**  
**_Full Stack Engineer_**  
Linkedin: (https://www.linkedin.com/in/sagun-shrestha-89ab60223/)  
Github: (https://github.com/sagun1151)

**_Anthony Coman_**  
**_Full Stack Engineer_**  
Linkedin: (https://www.linkedin.com/in/anthony-coman/)  
Github: (https://github.com/acoman-cloud)
