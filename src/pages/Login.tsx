import { motion, AnimatePresence } from 'motion/react'
import { Card, CardContent, Button, Input, TextField, Label, FieldError } from '@heroui/react'
import { useLoginForm } from '../hooks/useLoginForm'
import ThreeBackground from '../components/atoms/ThreeBackground'

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
    <>
      <ThreeBackground />
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              TCOPOS
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              Gestiona tus cuentas y transacciones
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={Object.keys(errors).length > 0 ? 'error' : 'idle'}
              variants={shakeVariants}
              animate={Object.keys(errors).length > 0 ? 'shake' : undefined}
            >
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/10">
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <motion.p
                    variants={itemVariants}
                    className="text-slate-400 text-xs text-center"
                  >
                    Demo: <span className="text-blue-400">test@test.com</span> / cualquier contraseña
                  </motion.p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div variants={itemVariants}>
                      <TextField
                        isInvalid={!!errors.email}
                        className="w-full"
                      >
                        <Label className="text-slate-300 text-sm">Correo electrónico</Label>
                        <div className="relative mt-1.5">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
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
                            className="pl-10 text-white placeholder:text-slate-500"
                          />
                        </div>
                        {errors.email && (
                          <FieldError className="text-red-400 text-xs mt-1">{errors.email.message}</FieldError>
                        )}
                      </TextField>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <TextField
                        isInvalid={!!errors.password}
                        className="w-full"
                      >
                        <Label className="text-slate-300 text-sm">Contraseña</Label>
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
                          className="mt-1.5 text-white placeholder:text-slate-500"
                        />
                        {errors.password && (
                          <FieldError className="text-red-400 text-xs mt-1">{errors.password.message}</FieldError>
                        )}
                      </TextField>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full font-semibold"
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
                      className="text-red-400 text-xs text-center"
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
            className="text-center text-slate-500 text-xs mt-6"
          >
            &copy; {new Date().getFullYear()} TCOPOS &mdash; App financiera
          </motion.p>
        </motion.div>
      </div>
    </>
  )
}
