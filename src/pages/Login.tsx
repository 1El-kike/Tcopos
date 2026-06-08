import { motion, AnimatePresence } from 'motion/react'
import { Card, CardContent, Button, Input, TextField, Label, FieldError } from '@heroui/react'
import { useLoginForm } from '../hooks/useLoginForm'
import ThreeBackground from '../components/atoms/ThreeBackground'
import BackgroundEffects from '../components/atoms/BackgroundEffects'

function AlertCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

const shakeVariants = {
  shake: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.4 },
  },
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Login() {
  const { register, handleSubmit, errors, isSubmitting } = useLoginForm()

  return (
    <div className="min-h-screen bg-navy-900">
      <ThreeBackground />
      <BackgroundEffects />
      <div className="min-h-screen grid place-items-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm"
        >
          <motion.div variants={itemVariants} className="text-center mb-10 space-y-2">
            <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-gold-400 to-yellow-300 bg-clip-text text-transparent tracking-wide">
              TCOPOS
            </h1>
            <p className="text-slate-500 text-sm font-heading tracking-wide">
              Gestiona tus cuentas y transacciones
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={Object.keys(errors).length > 0 ? 'error' : 'idle'}
              variants={shakeVariants}
              animate={Object.keys(errors).length > 0 ? 'shake' : undefined}
            >
              <Card className="bg-navy-800/60 backdrop-blur-xl border border-navy-600/30 shadow-2xl shadow-navy-900/50">
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <motion.p
                    variants={itemVariants}
                    className="text-slate-600 text-xs text-center font-heading tracking-wide"
                  >
                    Demo: <span className="text-blue-light">test@test.com</span> / cualquier contraseña
                  </motion.p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div variants={itemVariants} className="space-y-1">
                      <TextField
                        isInvalid={!!errors.email}
                        className="w-full"
                      >
                        <Label className="text-slate-400 text-sm font-heading tracking-wide">Correo electrónico</Label>
                        <div className="relative mt-1.5">
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 z-10">
                            <AlertCircle />
                          </span>
                          <Input
                            {...register('email', {
                              required: 'El correo es requerido',
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Correo inválido',
                              },
                            })}
                            type="email"
                            placeholder="test@test.com"
                            disabled={isSubmitting}
                            className="bg-transparent w-full text-slate-200 placeholder:text-slate-600"
                          />
                        </div>
                        {errors.email && (
                          <FieldError className="text-slate-400 text-xs mt-1">{errors.email.message}</FieldError>
                        )}
                      </TextField>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-1">
                      <TextField
                        isInvalid={!!errors.password}
                        className="w-full"
                      >
                        <Label className="text-slate-400 text-sm font-heading tracking-wide">Contraseña</Label>
                        <Input
                          {...register('password', {
                            required: 'La contraseña es requerida',
                            minLength: {
                              value: 1,
                              message: 'Debes ingresar una contraseña',
                            },
                          })}
                          type="password"
                          placeholder="••••••••"
                          disabled={isSubmitting}
                          className="bg-transparent mt-1.5 text-slate-200 placeholder:text-slate-600"
                        />
                        {errors.password && (
                          <FieldError className="text-slate-400 text-xs mt-1">{errors.password.message}</FieldError>
                        )}
                      </TextField>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full font-heading font-semibold bg-gradient-to-r from-blue-accent to-navy-500 text-white hover:from-blue-light hover:to-blue-accent border-none tracking-wide"
                        isPending={isSubmitting}
                        isDisabled={isSubmitting}
                        size="lg"
                      >
                        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                      </Button>
                    </motion.div>
                  </form>

                  {Object.keys(errors).length > 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-slate-500 text-xs text-center font-heading tracking-wide"
                    >
                      Revisa los campos marcados en rojo
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <motion.p
            variants={itemVariants}
            className="text-center text-slate-600 text-xs mt-8 font-heading tracking-wide"
          >
            &copy; {new Date().getFullYear()} TCOPOS &mdash; App financiera
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
