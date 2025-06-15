const MenuItem = require('../models/MenuItem');

// CREATE a new menu item Post /api/menu
exports.createMenu = async (req, res) => {
    try{
        //destructure the request body
        const { name, description, price, category, imageUrl } = req.body;
        // Create a new menu item instance
        const newMenuItem = new MenuItem({
            name,
            description,
            price,
            category,
            imageUrl
        });
        await newMenuItem.save();
        res.status(201).json({ message: 'Menu item created successfully', menuItem: newMenuItem });
    }catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }finally {
        console.log('Menu item creation attempted');
    }
}
// READ all menu items GET /api/menu
exports.allMenu = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }finally {
        console.log('Menu items fetched');
    }
}
// READ a single menu item GET /api/menu/:id
exports.singleMenu = async (req, res) => {
    try {
        // Find the menu item by ID
        const menuItem = await MenuItem.findById(req.params.id);
        // If the menu item is not found, return a 404 error
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        // If found, return the menu item
        res.status(200).json(menuItem);
    } catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }finally {
        console.log('Menu item fetched');
    }
}
// UPDATE a menu item PUT /api/menu/:id
exports.updatedMenu = async (req, res) => {
    try {
        // Find the menu item by ID and update it
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        // If the menu item is not found, return a 404 error
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        // If updated successfully, return the updated menu item
        res.status(200).json({ message: 'Menu item updated successfully', menuItem: updatedMenuItem }); 
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    finally {
        console.log('Menu item updated');
    };
}
// DELETE a menu item DELETE /api/menu/:id
exports.deleteMenu = async (req, res) => {
    try {
        // Find the menu item by ID and delete it
        const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
        // If the menu item is not found, return a 404 error
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        // If deleted successfully, return a success message
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    finally {
        console.log('Menu item deleted');
    };
}
