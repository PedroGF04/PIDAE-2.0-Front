import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface AlumnoPDF {
  nombre: string;
  calificacion: string | number;
}

interface DatosReporte {
  profesor: string;
  curso: string;
  nivel: string;
  fecha: string;
  alumnos: AlumnoPDF[];
  firmaProfesor: string;
  firmaDirector: string;
}

interface ReporteProps {
  datos: DatosReporte;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    paddingBottom: 40,
  },
  // --- HEADER (HEADER_H = 108) ---
  headerContainer: {
    height: 108,
    position: 'relative',
    backgroundColor: '#0d1b3e', // Fondo base
  },
  fondoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 108,
    opacity: 0.45, // Inverso de Alpha 0.55 para simular el rectangulo superpuesto
  },
  headerTextContainer: {
    position: 'absolute',
    top: 28, // PAGE_H - 50 a top-down
    width: '100%',
    alignItems: 'center',
  },
  titleEscuela: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 30,
    color: '#ffffff',
  },
  titleSuperior: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    color: '#ffffff',
    marginTop: 6, // Diferencia entre 50 y 70 en Python
  },
  logo: {
    position: 'absolute',
    right: 30, 
    top: 9, 
    height: 90, 
    // Borramos el width y el objectFit
  },
  // --- TÍTULO PRINCIPAL ---
  mainTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 17,
    color: '#1a2a4a',
    textAlign: 'center',
    marginTop: 30, // PAGE_H - 138 desde el bottom del header
    marginBottom: 17,
  },
  // --- CONTENEDOR CENTRAL (MARGIN = 50) ---
  contentWrapper: {
    paddingHorizontal: 50,
  },
  // --- SECCIÓN INFO (INFO_H = 105) ---
  infoBox: {
    backgroundColor: '#dde3f0',
    borderRadius: 8,
    height: 105,
    paddingTop: 15,
    paddingHorizontal: 14,
    marginBottom: 15, // Espacio antes de calificaciones (CAL_TOP - 15)
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    height: 19,
  },
  infoLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#1a2a4a',
    width: 72, // lx + 72 en Python
  },
  whiteValueBox: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    height: 19,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  infoValue: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a2a4a',
  },
  // --- SECCIÓN CALIFICACIONES ---
  calificacionesBox: {
    backgroundColor: '#dde3f0',
    borderRadius: 8,
    paddingTop: 15,
    paddingBottom: 15,
  },
  calificacionesTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: '#1a2a4a',
    textAlign: 'center',
    marginBottom: 15,
  },
  calRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 25, // ROW_H = 25
    paddingHorizontal: 20, // MARGIN + 20
  },
  calName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#1a2a4a',
  },
  calWhiteBox: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: 80,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calValue: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a2a4a',
  },
  // --- SECCIÓN FIRMAS ---
  firmasContainer: {
    marginTop: 30, // FIRMA_TOP
  },
  firmasMainTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: '#1a2a4a',
    textAlign: 'center',
    marginBottom: 20,
  },
  firmaBlock: {
    marginBottom: 25,
    paddingHorizontal: 10, // MARGIN + 10
  },
  firmaLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#1a2a4a',
    marginBottom: 5,
  },
  firmaLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaaacc',
    width: 400,
    marginBottom: 5,
  },
  firmaHashText: {
    fontFamily: 'Courier',
    fontSize: 7,
    color: '#555555',
  }
});

const ReporteDocument: React.FC<ReporteProps> = ({ datos }) => {
  
  // Función equivalente al truncamiento en Python: hash_val[:80] + "..."
  const truncarHash = (hash?: string) => {
    if (!hash) return "Pendiente..."; // Si no hay hash, mostramos este texto de seguridad
    return hash.length > 80 ? hash.substring(0, 80) + "..." : hash;
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        
        {/* --- INICIA DIBUJO DEL HEADER --- */}
        <View style={styles.headerContainer}>
          {/* Fondo escalado con opacidad equivalente al fillAlpha(0.55) oscuro */}
          <Image src="/fondo.jpg" style={styles.fondoOverlay} />
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.titleEscuela}>ESCUELA</Text>
            <Text style={styles.titleSuperior}>SUPERIOR DE CRIPTOGRAFÍA</Text>
          </View>

          {/* Escudo con dimensiones matemáticamente fijas a h=90 */}
          <Image src="/logoesc.png" style={styles.logo} />
        </View>

        {/* Título */}
        <Text style={styles.mainTitle}>Reporte de calificaciones</Text>

        <View style={styles.contentWrapper}>
          
          {/* --- SECCIÓN INFO --- */}
          <View style={styles.infoBox}>
            {/* Profesor */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Profesor/a</Text>
              <View style={[styles.whiteValueBox, { width: 380 }]}>
                <Text style={styles.infoValue}>{datos.profesor}</Text>
              </View>
            </View>
            
            {/* Curso */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Curso</Text>
              <View style={[styles.whiteValueBox, { width: 380 }]}>
                <Text style={styles.infoValue}>{datos.curso}</Text>
              </View>
            </View>

            {/* Nivel y Fecha en la misma línea (Simulando coordenadas absolutas de Python) */}
            <View style={[styles.infoRow, { justifyContent: 'space-between', width: 452 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.infoLabel}>Nivel</Text>
                <View style={[styles.whiteValueBox, { width: 145 }]}>
                  <Text style={styles.infoValue}>{datos.nivel}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.infoLabel, { width: 40 }]}>Fecha</Text>
                <View style={[styles.whiteValueBox, { width: 120 }]}>
                  <Text style={styles.infoValue}>{datos.fecha}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* --- SECCIÓN CALIFICACIONES --- */}
          <View style={styles.calificacionesBox}>
            <Text style={styles.calificacionesTitle}>CALIFICACIONES</Text>
            
            {datos.alumnos.map((alum, index) => (
              <View style={styles.calRow} key={index}>
                <Text style={styles.calName}>{alum.nombre}</Text>
                
                {/* Cajita blanca para la calificación */}
                <View style={styles.calWhiteBox}>
                  <Text style={styles.calValue}>{alum.calificacion}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* --- SECCIÓN FIRMAS DIGITALES --- */}
          <View style={styles.firmasContainer}>
            <Text style={styles.firmasMainTitle}>Firma Digital (ECDSA)</Text>

            <View style={styles.firmaBlock}>
              <Text style={styles.firmaLabel}>Firma Profesor</Text>
              <View style={styles.firmaLine}></View>
              <Text style={styles.firmaHashText}>
                Hash: {truncarHash(datos.firmaProfesor)}
              </Text>
            </View>

            <View style={styles.firmaBlock}>
              <Text style={styles.firmaLabel}>Firma Director</Text>
              <View style={styles.firmaLine}></View>
              <Text style={styles.firmaHashText}>
                Hash: {truncarHash(datos.firmaDirector)}
              </Text>
            </View>

          </View>

        </View>
      </Page>
    </Document>
  );
};

export default ReporteDocument;