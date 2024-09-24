import db  from '../config/db.js'; 

const Recipe = {
   async getAll() {
    const [rows] = await db.promise().query('SELECT * FROM recipes');
    return rows;
},

    async getById(id) {
    const [rows] = await db.promise().query('SELECT * FROM recipes WHERE id = ?', [id]);
    return rows;
  },

  
  async create(title, type, description, ingredient) {
    try {
      const [result] = await db.promise().query(
        'INSERT INTO recipes (title, type, ingredient, description) VALUES (?, ?, ?, ?)',
        [title, type, ingredient, description]
      );
      return result;
    } catch (error) {
      console.error('Erreur SQL lors de la création:', error); 
      throw error;
    }
  },
  

async checkRecipe(title) {
  const [rows] = await db.promise().query('SELECT COUNT(*) as count FROM recipes WHERE title = ?', [title]);
  return rows[0].count; 
},

async update(id, updatedData) {
  try {
    const [result] = await db.promise().query(
      'UPDATE recipes SET ? WHERE id = ?',
      [updatedData, id]
    );
    return result;
  } catch (error) {
    console.error('Erreur SQL lors de la mise à jour:', error);
    throw error; 
  }
},

  async delete(id) {
    const [result] = await db.promise().query('DELETE FROM recipes WHERE id = ?', [id]);
    return result;
  }
};

export default Recipe;
