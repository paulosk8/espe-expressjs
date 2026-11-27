const mongoose = require("mongoose");

// Reseña de una cita: vive en MongoDB, pero apunta a datos de PostgreSQL
const reviewSchema = new mongoose.Schema(
  {
    // Referencias a PostgreSQL: se guardan como Number (no hay ObjectId ni populate)
    appointmentId: {
      type: Number,
      required: [true, "La cita es obligatoria"],
      unique: true, // índice único: una reseña por cita
    },
    userId: { type: Number, required: true },
    // Copia del nombre (desnormalización): la lista de reseñas no consulta PostgreSQL
    patientName: { type: String, required: true },
    // Referencia dentro de MongoDB: ObjectId + ref → se puede usar populate
    specialty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "La calificación es obligatoria"],
      min: [1, "La calificación mínima es 1"],
      max: [5, "La calificación máxima es 5"],
      validate: [Number.isInteger, "La calificación debe ser un número entero"],
    },
    comment: {
      type: String,
      maxlength: [300, "El comentario no puede superar 300 caracteres"],
    },
    tags: [
      {
        type: String,
        enum: {
          values: ["puntual", "amable", "claro", "espera-larga"],
          message: "La etiqueta {VALUE} no es válida",
        },
      },
    ],
  },
  { timestamps: true }, // createdAt y updatedAt automáticos
);

// Índice compuesto: "reseñas de una especialidad, las más nuevas primero"
reviewSchema.index({ specialty: 1, createdAt: -1 });

module.exports = mongoose.model("Review", reviewSchema);