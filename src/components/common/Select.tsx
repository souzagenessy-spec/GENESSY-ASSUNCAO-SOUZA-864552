export default function Select(props: any) {
  return (
    <select {...props}>
      <option value="">Selecione</option>
      <option value="dog">Cachorro</option>
      <option value="cat">Gato</option>
      <option value="bird">Pássaro</option>
      <option value="rabbit">Coelho</option>
      <option value="other">Outro</option>
    </select>
  );
}
