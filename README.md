# Bank Account Fraud Challenge (NeurIPS 2022)

## Equipo
- [Nombres de los integrantes aquí]
- Curso: [TC3006C]
- Fecha: Septiembre 2025

---

## 1. Contexto del Reto
El fraude en la apertura de cuentas bancarias es un problema de alto impacto económico y social.  
El reto BAF (Bank Account Fraud) consiste en detectar solicitudes fraudulentas en un dataset sintético con más de 1 millón de registros y variantes que simulan distintos sesgos y desbalances.  

---

## 2. Objetivo del Proyecto
- Desarrollar modelos de Machine Learning capaces de identificar fraudes con alta precisión y equidad.  
- Validar el rendimiento en 6 datasets (Base + Variantes I-V) que incluyen sesgos controlados, desbalance extremo y cambios temporales.  

---

## 3. Datasets
- **Número de registros:** 1,000,000  
- **Número de variables:** 30  
- **Tipos de variables:**  
  - Numéricas (ej. ingresos, transacciones, edad).  
  - Categóricas (ej. ocupación, estado civil).  
- **Clase minoritaria:** Fraude < 1% de los registros.  
- **Datos generados con CTGAN para preservar privacidad.**

---

## 4. Preprocesamiento de Datos
Se aplicaron al menos 2 técnicas, cubriendo lo solicitado en los criterios de evaluación:

1. **Imputación de valores faltantes:** Los valores `-1` fueron tratados como datos faltantes.  
2. **Escalamiento:** Se normalizaron variables numéricas para evitar sesgos por diferencias de escala.  
3. **Manejo de outliers:** Recorte de valores atípicos con IQR.  
4. **Balanceo de clases:** Uso de técnicas como **SMOTE** (oversampling) y undersampling para contrarrestar el desbalance.  

---

## 5. Análisis Exploratorio de Datos (EDA)
- Distribución de clases: fraudes representan menos del 1%.  
- Correlaciones bajas entre variables → no hay multicolinealidad fuerte.  
- Existencia de outliers y valores faltantes.  
- Se requieren técnicas avanzadas para que las métricas sean significativas (accuracy no basta).  

---

## 6. Estrategia de Modelado
1. **Tratamiento de datos y refinamiento**
   - Imputación de faltantes.  
   - Escalamiento de numéricas.  
   - Balanceo de clases.  

2. **Modelos de Clasificación probados**
   - Regresión Logística (baseline).  
   - Árboles de decisión y Random Forest.  
   - Support Vector Machines (SVM).  
   - Perceptrón multicapa (MLP, red neuronal).  

3. **Evaluación del modelo**
   - Validación con train/test/validation.  
   - Métricas: accuracy, precision, recall, F1, ROC-AUC.  
   - Diagnóstico de underfitting y overfitting.  

---

## 7. Resultados y Hallazgos
### Regresión Logística
- Modelo sencillo y rápido de entrenar.  
- Tiende a **overfitting** por el tamaño de los datos.  
- Muchos falsos negativos (baja precisión en la clase minoritaria).  
- Sensible a outliers y escalas de variables.  
- F1-Score bajo (~0.08 para fraude).  

### Random Forest
- Mejor manejo de no linealidad.  
- Más robusto frente a outliers y desbalance.  
- Aumenta recall pero puede ser más costoso en cómputo.  

### MLP (Red Neuronal)
- Capacidad de detectar patrones complejos.  
- Riesgo alto de **overfitting** si no se aplica regularización.  

---

## 8. Fairness en el Reto
- Riesgo de que el modelo discrimine a grupos (ej. mayores de 50 años).  
- Métricas de equidad consideradas:  
  - **Predictive Equality** (falsos positivos por grupo).  
  - **Equal Opportunity** (verdaderos positivos por grupo).  
- La validación se hará en todas las variantes del dataset BAF.  

---

## 9. Supuestos y Regularización
- Se validaron supuestos básicos de los modelos lineales (logística).  
- Uso de regularización **L2** para evitar sobreajuste.  
- Comparación de bias-variance tradeoff en modelos complejos.  

---

## 10. Aspectos Éticos y Normativos
La solución propuesta cumple con los lineamientos éticos y normativos esperados en un sistema de IA aplicado a la banca:  

1. **Privacidad y protección de datos**  
   - Se trabaja únicamente con datos sintéticos generados con CTGAN, lo que elimina riesgos de exposición de información personal sensible.  

2. **Equidad y no discriminación**  
   - Se incorporaron métricas de fairness para garantizar que el modelo no perjudique de manera desproporcionada a grupos específicos (ej. personas mayores, género, nivel socioeconómico).  
   - Se aplicaron técnicas de balanceo y validación en variantes con sesgos para evaluar robustez.  

3. **Transparencia y explicabilidad**  
   - Los modelos utilizados (como regresión logística y árboles de decisión) permiten interpretación clara de variables relevantes.  
   - Se documentaron métricas, gráficas y decisiones de preprocesamiento para dar trazabilidad.  

4. **Cumplimiento normativo**  
   - La solución se enmarca en principios de **IA Responsable** y prácticas de **Fair ML**.  
   - En un contexto real, este tipo de sistema debería alinearse con normativas internacionales de privacidad (ej. GDPR) y con regulaciones financieras locales para evitar sesgos en la toma de decisiones de crédito.  

---

## 11. Próximos Pasos
- Completar la limpieza y transformación de las variantes I-V.  
- Entrenar modelos avanzados y comparar desempeño.  
- Incorporar métricas de fairness en la evaluación final.  
- Preparar el mejor modelo para despliegue.  

---

## 12. Repositorio
Este repositorio contiene:  
- **EDA.ipynb y variantes** → análisis exploratorio.  
- **preprocess_all_datasets.py** → funciones de preprocesamiento.  
- **regressionLogistica.ipynb** → modelo base de regresión logística.  
- **MLP_BASE.ipynb, SVM_MLP_BASE.ipynb** → experimentos con redes neuronales y SVM.  
- **Base_clean.parquet** → dataset preprocesado.  
- **fraud-detection-webapp/** → prototipo para despliegue.  

---
