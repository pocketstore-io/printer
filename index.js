import config from '../storefront/pocketstore.json';
import PocketBase from 'pocketbase';
import path from 'path'
import {createInvoice} from './src/generate';
const fs = require('fs');

// Define the folder name
const folderName = path.join(__dirname, 'documents');

// Check if the folder already exists
if (!fs.existsSync(folderName)) {
  // Create the folder
  fs.mkdirSync(folderName);
  console.log(`Folder '${folderName}' has been created.`);
} else {
  console.log(`Folder '${folderName}' already exists.`);
}

  const url = 'https://'+config.domain;
  const pb = new PocketBase(url);
  await pb.collection('_superusers').authWithPassword('admin@jonathan-martz.de','4FaJq4Nhtz$W4PXiFLA&w48');
  let collection = await pb.collection('orders').getList(1,100, {
    filter: 'invoice =""',
    expand: 'customer'
  });

  collection.items.map((order)=>{
    console.log(order);
    console.log(order.expand.customer);
    console.log(order.cart);

  createInvoice(order, 'documents/invoice.pdf');

  });