#!/bin/bash

# Ejecutar npm run build
npm run build

# Verificar si la compilación fue exitosa
if [ $? -ne 0 ]; then
  echo "La compilación falló"
  exit 1
fi

# Crear la carpeta output si no existe
OUTPUT_DIR="output"
mkdir -p $OUTPUT_DIR

# Copiar los archivos generados a la carpeta output
cp -r dist/* $OUTPUT_DIR/

# Crear la lista de archivos en el directorio output
FILES=$(find $OUTPUT_DIR -type f)

# Crear el contenido del recurso
RESOURCE='<resource identifier="RESOURCE1" adlcp:scormType="sco" href="output/index.html#/ejercicios">'

# Agregar cada archivo al recurso
for FILE in $FILES; do
  RELATIVE_PATH=${FILE#$OUTPUT_DIR/}
  RESOURCE="$RESOURCE\n      <file href=\"$RELATIVE_PATH\"/>"
done

# Cerrar el recurso
RESOURCE="$RESOURCE\n    </resource>"

# Crear el manifiesto con la estructura deseada
MANIFEST='<?xml version="1.0" encoding="UTF-8"?>\n<manifest>\n  <resources>\n'"$RESOURCE"'\n  </resources>\n</manifest>'

# Guardar el manifiesto en un archivo dentro de la carpeta output
echo -e "$MANIFEST" > $OUTPUT_DIR/manifest.xml

echo "El manifiesto ha sido creado exitosamente en la carpeta $OUTPUT_DIR"
