import type { CSSProperties } from 'vue'

const btnAcceptDefault: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  backgroundColor: '#00f2ff',
  fontWeight: 'bold',
  color: '#0b0e14',
  boxShadow: '0 0 15px 0 rgba(0, 242, 255, 0.30)',
}

export const buttons: TailwindCustomStyles = {
  '.btn-accept': btnAcceptDefault,
  '.btn-accept-with-paddings': {
    ...btnAcceptDefault,
    padding: '8px 20px',
  },
}
