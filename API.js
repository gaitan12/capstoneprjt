
const express = require('express');
const sequelize = require('./config/database');
/*const multer = require('multer');*/

//import modules
const Customer = require('./models/customers');
const Packages = require('./models/packages');
const Orders = require('./models/orders');
const Inquiries = require('./models/inquiries');
/*const router = express.Router();


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });*/

const app = express();

app.use(express.json());

const cors = require('cors');

app.use(cors());



app.listen(3000, () =>{
    console.log('server running');
    sequelize.sync()
    .then(()=>{
        console.log('Database synced successfully');
    })
    .catch((err)=>{
        console.log('error syncing database', err);
    });
})

app.get('/packages', async(req, res) => {
    try {
        const packages = await  Packages.findAll({
            include:[
                {
                model: Orders,
                as: 'order',
            },
            ],
        });
        res.status(200).json(packages);
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'failed to retrieve packages'});
    }
});

app.post('/packages', async (req, res) => {
    try {
      // Log the incoming request body for debugging
      console.log('Request Body:', req.body);
  
      // Destructure and validate input
      
      const { category, price, destination,description, order_id } = req.body;
     

      if (!category || !price || !destination ||!description  ||! order_id ) {
        return res.status(400).json({ error: 'Invalid input data: category, price, destination, description, and order are required' });
      }
  
      // Create the product
      const newpackage = await Packages.create({ category, price, destination, destination, description, order_id });
  
      // Respond with success
      res.status(201).json({
        message: 'Package created successfully',
        package: newpackage,
      });
    } catch (err) {
      // Log error for debugging
      console.error('Error creating package:', err);
  
      // Respond with a generic error message
      res.status(500).json({ error: 'Failed to create package' });
    }
  });

  /*router.post('/packages', upload.single('image'), async (req, res) => {
    try {
      const { category, price, destination, description, orderid } = req.body;
  
      const newPackage = await Packages.create({
        category,
        price,
        destination,
        description,
        orderid,
        image: req.file ? req.file.buffer : null,
      });
  
      res.json(newPackage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });*/


  app.post('/inquiries', async (req, res) => {
    try {
      // Log the incoming request body for debugging
      console.log('Request Body:', req.body);

      const newInquiries = await Inquiries.create(req.body);

      console.log("Saved Inquiry:", newInquiries.toJSON());
  
      // Destructure and validate input
      const { first_name, last_name, email,phone_number,
        where_would_you_like_to_go,
        when_would_you_like_to_depart,
        when_would_you_like_to_return,
        Are_your_dates_flexible,
        what_is_your_departure_city,
        how_many_travelers, 
        if_traveling_with_children_less_than_18_please_list_their_ages,
        message  } = req.body;
      
if (
  !first_name 
|| !last_name 
|| !email 
||!phone_number 
||! where_would_you_like_to_go 
||!when_would_you_like_to_depart 
||!when_would_you_like_to_return 
||!Are_your_dates_flexible
||!what_is_your_departure_city
||!how_many_travelers 
||!if_traveling_with_children_less_than_18_please_list_their_ages 
||!message ) {
return res.status(400).json({ error: 'Invalid input data control' });
}

      // Create the inqiury
      const newinquiry = await Inquiries.create({ first_name, last_name, email,phone_number ,where_would_you_like_to_go,when_would_you_like_to_depart,
        when_would_you_like_to_return,what_is_your_departure_city,Are_your_dates_flexible, how_many_travelers, if_traveling_with_children_less_than_18_please_list_their_ages,
        message
       });
  
      // Respond with success
      res.status(201).json({
        message: 'inquiry created successfully',
        inquiry: newinquiry,
      });
    } catch (err) {
      // Log error for debugging
      console.error('Error creating inquiry:', err);
  
      // Respond with a generic error message
      res.status(500).json({ error: 'Failed to create inquiry' });
    }
  });
  




app.post('/customers', async (req, res) => {
    try {
      console.log(req.body);
      const { name, email } = req.body;
  
      // Validate input
      if (!name || !email) {
        return res.status(400).json({ error: 'Customer name and email are required' });
      }
  
      console.log(name);

        // Create the customer
    const newcustomer = await Customer.create({ name, email });

    // Respond with a successful process
    res.status(201).json({ message: 'Customer created successfully', customer: newcustomer });
  } catch (err) {
    console.error(err);

    // Handle specific Sequelize errors
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Respond with a generic error for other cases
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

app.get('/customers', async (req, res) => {
    try {
      const allcustomers = await Customer.findAll({
        include: [
          {
            model: Orders,
            as: 'Orders', // Ensure alias matches model association
          },
        ],
      });
      res.json(allcustomers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve customers' });
    }
  });

  app.get('/customers/:id', async (req, res) => {
    try {
      // Extract the customer ID from the request parameters and convert it to an integer
      const id = parseInt(req.params.id, 10); // Base 10 conversion
  
      // Validate the ID
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
      }
  
      // Find the customer by ID and include their associated orders
      const customer = await Customer.findOne({
        where: { id }, // Match the customer ID (as an integer)
        include: [
          {
            model: Orders,
            as: 'Orders', // Ensure alias matches the model association
          },
        ],
      });
  
      // Check if the customer exists
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      // Respond with the customer data
      res.json(customer);
    } catch (err) {
      console.error('Error retrieving customer:', err);
      res.status(500).json({ error: 'Failed to retrieve customer' });
    }
  });

  app.delete('/customers/:id', async (req, res) => {
    try {
      // Retrieve the customer ID from the request parameters and convert it to an integer
      const id = parseInt(req.params.id, 10); // Base 10 conversion
  
      // Validate the ID
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
      }
  
      // Find the customer by ID
      const customer = await Customer.findOne({
        where: { id },
        include: [
          {
            model: Orders,
            as: 'Orders', // Ensure alias matches the model association
          },
        ],
      });
  
      // Check if the customer exists
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      // This checks whether the customer has associated orders. customer.orders.length > 0 checks if there are any orders in the list (i.e., the array is not empty).
      if (customer.orders && customer.orders.length > 0) {
        for (const order of customer.orders) {
          await Orders.destroy({ where: { id: order.id } });
        }
      }
  
      // Delete the customer
      await Customer.destroy({ where: { id } });
  
      // Respond with a success message
      res.status(200).json({ message: 'Customer and associated orders deleted successfully' });
    } catch (err) {
      console.error('Error deleting customer:', err);
      res.status(500).json({ error: 'Failed to delete customer' });
    }
  });

  app.put('/customers/:id', async (req, res) => {
    try {
      // Extract the customer ID from the request parameters and convert it to an integer
      const id = parseInt(req.params.id, 10); // Base 10 conversion
  
      // Validate the ID
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
      }
  
      // Destructure and validate the input fields from the request body
      const { name, email } = req.body;
      if (!name && !email) {
        return res.status(400).json({ error: 'At least one field (customer_name or email) is required to update' });
      }
  
      // Find the customer by ID
      const customer = await Customer.findOne({ where: { id } });
  
      // Check if the customer exists
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      // Update the customer's information
      const updatedCustomer = await customer.update({ name, email });
  
      // Respond with the updated customer data
      res.status(200).json({
        message: 'Customer updated successfully',
        customer: updatedCustomer,
      });
    } catch (err) {
      console.error('Error updating customer:', err);
  
      // Respond with a generic error message
      res.status(500).json({ error: 'Failed to update customer' });
    }
  });


  app.post('/orders', async (req, res) => {
    const transaction = await sequelize.transaction();
  
    try {
      const { orders_date, customer_id, packages } = req.body; // Extract packages
  
      // Validate inputs
      if (!orders_date || !customer_id || !Array.isArray(packages)) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
  
      // Create the order
      const newOrder = await Orders.create(
        { orders_date, customer_id },
        { transaction }
      );
  
      // Prepare packages for bulk creation
      const packagesToCreate = packages.map((package) => ({
        ...package, // Spread individual package properties
        orderid: newOrder.id, // Ensure this matches your DB column name
      }));
  
      // Add packages to the order
      await Packages.bulkCreate(packagesToCreate, { transaction });
  
      // Commit transaction
      await transaction.commit();
  
      res.status(201).json({
        message: 'Order created successfully',
        order: newOrder,
      });
    } catch (err) {
      console.error(err);
  
      if (transaction) await transaction.rollback();
  
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  app.get('/orders/:id', async (req, res) => {
    try {
      // Extract the order ID from the request parameters and convert it to an integer
      const id = parseInt(req.params.id, 10); // Base 10 conversion
  
      // Validate the ID
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid order ID' });
      }
  
      // Find the order by ID and include associated customer details
      const order = await Orders.findOne({
        where: { id }, // Match the order ID (as an integer)
        include: [
          {
            model: Customer,
            as: 'customer', // Ensure alias matches model association
          },
        ],
      });
  
      // Check if the order exists
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Respond with the order data
      res.json(order);
    } catch (err) {
      console.error('Error retrieving order:', err);
  
      // Respond with a generic error message
      res.status(500).json({ error: 'Failed to retrieve order' });
    }
  });

  
  app.delete('/orders/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
  
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid order ID' });
      }
  
      // Find the order by ID
      const order = await Orders.findOne({
        where: { id },
        include: [
          {
            model: Customer, // Include associated products
            as: 'customer',
          },
        ],
      });
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Delete associated products
      if (Orders.packages && Orders.packages.length > 0) {
        await products.destroy({ where: { orderid: id } });
      }
  
      // Delete the order
      await Orders.destroy({ where: { id } });
  
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      console.error('Error deleting order:', err);
      res.status(500).json({ error: 'Failed to delete order' });
    }
  });

  app.get('/orders', async (req, res) => {
    try {
  
      // Find the order by ID and include associated customer details
      const order = await Orders.findAll({
        
        include: [
          {
            model: Customer,
            as: 'customer', // Ensure alias matches model association
          },
        ],
      });
  
      // Check if the order exists
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Respond with the order data
      res.json(order);
    } catch (err) {
      console.error('Error retrieving order:', err);
  
      // Respond with a generic error message
      res.status(500).json({ error: 'Failed to retrieve order' });
    }
  });