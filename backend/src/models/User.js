const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ism-sharif kiritilishi shart'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email kiritilishi shart'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Parol kiritilishi shart'],
      minlength: 6,
    },
    shopName: {
      type: String,
      default: 'StatusCraft Repair Center',
      trim: true,
    },
    role: {
      type: String,
      enum: ['technician', 'admin'],
      default: 'technician',
    },
  },
  { timestamps: true }
);

// Password hash middleware before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
