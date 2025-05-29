const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )

    return data.rows

  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get a single inventory item and inventory_name by inventory_id
 * ************************** */
async function getInventoryByInventoryId(inventory_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
        JOIN public.classification AS c
        ON i.classification_id = c.classification_id
        WHERE inv_id = $1`,
        [inventory_id]
    )

    return data.rows

  } catch(error) {
    console.error("getInventoryByInventoryId error" + error)
  }
}

async function getClassifications() {
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Add Classification
 * ************************** */
async function addClassification(classification_name) {
  const sql = `INSERT INTO public.classification (classification_name)
  VALUES ($1)`;

  try {
    return await pool.query(sql, [classification_name]);
  } catch (error) {
    return error.message;
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByInventoryId, getClassifications, addClassification}
