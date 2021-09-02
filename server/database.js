const mongoose = require('mongoose');
//const URI = 'mongodb://DESKTOP-53IVF38:27017,DESKTOP-53IVF38:27018,DESKTOP-53IVF38:27019?replicaSet=rs';
const URI = 'mongodb://localhost:27017/sapardelivery';


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
//mongoose.set('retryWrites', true);

mongoose
  .connect(URI)
  .then(() => console.log('database is running'))
  .catch((err) => console.log(err));