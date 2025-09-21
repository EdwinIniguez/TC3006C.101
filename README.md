## Consideraciones Éticas y Normatividad

Como parte del proyecto **Bank Account Fraud Challenge (NeurIPS 2022)**, es fundamental asegurar que el desarrollo de modelos de aprendizaje automático cumpla con principios éticos y normativos. Esto se refleja en dos dimensiones principales:

### Principios Éticos
- **Equidad (Fairness):** buscamos que el modelo no discrimine a ningún grupo de usuarios. Para esto se consideran métricas de equidad como *Predictive Equality* y *Equal Opportunity*.  
- **Transparencia:** documentamos las decisiones de preprocesamiento, selección de variables y métricas utilizadas.  
- **Explicabilidad:** usamos modelos base interpretables (ej. regresión logística) para facilitar la interpretación de resultados y comparación con modelos más complejos.  
- **Responsabilidad:** reconocemos que un error en la predicción puede afectar el acceso a servicios financieros, por lo que priorizamos métricas sensibles al desbalance y a los falsos negativos.

### Normatividad Aplicable
- **México:** Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), que protege la privacidad y el uso adecuado de los datos de las personas.  
- **Internacional:** principios de regulaciones como el **GDPR (General Data Protection Regulation)** en la Unión Europea, que promueve el consentimiento informado, el derecho al olvido y la transparencia en el uso de datos.  
- **Buenas prácticas en IA responsable:** recomendaciones de la **OCDE** y lineamientos de **High-Stakes AI**, aplicables a contextos financieros de alto impacto.

### Implementación en el Reto
- El dataset utilizado es **sintético y anonimizado**, lo que asegura que no se está comprometiendo información personal real.  
- Se realiza un análisis de sesgos y fairness en los diferentes datasets variantes para identificar disparidades entre grupos.  
- El repositorio incluye evidencia de preprocesamiento, validación y métricas que permiten auditar la robustez y equidad del modelo.

---


