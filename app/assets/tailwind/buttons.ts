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

const buttonCancelDefault: CSSProperties = {
  ...btnAcceptDefault,
  backgroundColor: '#151921',
  color: '#94A3B8',
  boxShadow: 'none',
  border: '1px solid #1E232D',
}

export const buttons: TailwindCustomStyles = {
  '.btn-accept': btnAcceptDefault,
  '.btn-accept-with-paddings': {
    ...btnAcceptDefault,
    padding: '8px 20px',
  },
  '.btn-cancel': buttonCancelDefault,
  '.btn-cancel-with-paddings': {
    ...buttonCancelDefault,
    padding: '8px 20px',
  },
}
