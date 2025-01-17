import com.example.vet.model.Paciente;
import com.example.vet.repository.PacienteRepository;
import com.example.vet.services.PacienteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PacienteServiceTest {

    @Mock
    private PacienteRepository pacienteRepository;

    @InjectMocks
    private PacienteService pacienteService;

    private Paciente paciente;

    @BeforeEach
    void setUp() {
        // Crear un paciente ficticio para las pruebas
        paciente = new Paciente();
        paciente.setId(1L);
        paciente.setNombrePaciente("Carlos");
        paciente.setRaza("Labrador");
    }

    @Test
    public void testCrearPaciente() {
        // Configurar el comportamiento del mock
        Mockito.when(pacienteRepository.save(Mockito.any(Paciente.class))).thenReturn(paciente);

        // Llamar al método que queremos probar
        Paciente creado = pacienteService.crearPaciente(paciente);

        // Verificar el resultado
        assertNotNull(creado);
        assertEquals("Carlos", creado.getNombrePaciente());
    }

    @Test
    public void testObtenerPacientes() {
        // Configurar el comportamiento del mock
        Mockito.when(pacienteRepository.findAll()).thenReturn(Arrays.asList(paciente));

        // Llamar al método que queremos probar
        List<Paciente> pacientes = pacienteService.obtenerPacientes();

        // Verificar el resultado
        assertNotNull(pacientes);
        assertFalse(pacientes.isEmpty());
        assertEquals(1, pacientes.size());
        assertEquals("Carlos", pacientes.get(0).getNombrePaciente());
    }

    @Test
    public void testObtenerPacientePorId() {
        // Configurar el comportamiento del mock
        Mockito.when(pacienteRepository.findById(1L)).thenReturn(Optional.of(paciente));

        // Llamar al método que queremos probar
        Optional<Paciente> encontrado = pacienteService.obtenerPacientePorId(1L);

        // Verificar el resultado
        assertTrue(encontrado.isPresent());
        assertEquals("Carlos", encontrado.get().getNombrePaciente());
    }

    @Test
    public void testActualizarPaciente() {
        // Configurar el comportamiento del mock
        Mockito.when(pacienteRepository.existsById(1L)).thenReturn(true);
        Mockito.when(pacienteRepository.save(Mockito.any(Paciente.class))).thenReturn(paciente);

        // Llamar al método que queremos probar
        Paciente actualizado = pacienteService.actualizarPaciente(1L, paciente);

        // Verificar el resultado
        assertNotNull(actualizado);
        assertEquals("Carlos", actualizado.getNombrePaciente());
    }

    @Test
    public void testEliminarPaciente() {
        // Configurar el comportamiento del mock
        Mockito.when(pacienteRepository.existsById(1L)).thenReturn(true);

        // Llamar al método que queremos probar
        boolean eliminado = pacienteService.eliminarPaciente(1L);

        // Verificar el resultado
        assertTrue(eliminado);

        // Verificar que el repositorio ha sido llamado para eliminar
        Mockito.verify(pacienteRepository, Mockito.times(1)).deleteById(1L);
    }

    @Test
    public void testEliminarPacienteNoExistente() {
        // Configurar el comportamiento del mock
        Mockito.when(pacienteRepository.existsById(1L)).thenReturn(false);

        // Llamar al método que queremos probar
        boolean eliminado = pacienteService.eliminarPaciente(1L);

        // Verificar el resultado
        assertFalse(eliminado);

        // Verificar que el repositorio no ha sido llamado para eliminar
        Mockito.verify(pacienteRepository, Mockito.times(0)).deleteById(1L);
    }
}
